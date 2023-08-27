const controller = {
    /* Initializing the webpage */
    init: function() {
        /* setting up event listeners */
        this.setupEventListeners();

        /* keeping drop-down menus populated */
        view.populateMonthDropdown();
        view.populateTimeDropdown();

        /* initialize empty graph */
        view.initEmptyGraph();

        /* show the drawing */
        view.drawSolarSimulation();
    },

    /* Functions for different elements to respond to based on user interaction */
    setupEventListeners: function() {
        const inputListeners = [
            { id: 'month', event: 'change', handler: this.handleMonthChange },
            { id: 'date', event: 'change', handler: this.handleDateChange },
            { id: 'time', event: 'change', handler: this.handleTimeChange },
            { id: 'collector-area', event: 'input', handler: this.handleCollectorAreaChange },
            { id: 'collector-depth', event: 'input', handler: this.handleCollectorDepthChange },
            { id: 'collector-tilt', event: 'input', handler: this.handleCollectorTiltChange },
            { id: 'pipe-length', event: 'input', handler: this.handlePipeLengthChange },
            { id: 'storage-tank-volume', event: 'input', handler: this.handleStorageTankVolumeChange },
            { id: 'temperature', event: 'input', handler: this.handleTemperatureChange },
            { id: 'time-step', event: 'input', handler: this.handleTimeStepChange },
            { id: 'startSimulator', event: 'click', handler: this.startSimulator },
            // { id: 'resetButton', event: 'click', handler: this.resetToInitialState }
        ];

        inputListeners.forEach(item => {
            const element = document.getElementById(item.id);
            element.addEventListener(item.event, item.handler.bind(this));
        });

        window.addEventListener('resize', this.handleWindowResize);
    },

    startSimulator: function() {
        console.log("Entered startSimulator function");

        // Begin the animation process
        this.triggerAnimations();

        console.log("Exiting startSimulator function");
    },

    triggerAnimations: function() {
        // Apply classes to trigger sliding animations
        const controlsDiv = document.querySelector('.controls');
        const graphDiv = document.querySelector('.graph');
        const twoDRenderingDiv = document.querySelector('.two-d-rendering');

        // Clearing anything that might have been running
        controlsDiv.classList.remove('controls-slide-out', 'controls-slide-in');
        graphDiv.classList.remove('graph-slide-in', 'graph-slide-out');
        twoDRenderingDiv.classList.remove('two-d-rendering-slide-in', 'two-d-rendering-slide-out');

        // After clearing things, add
        controlsDiv.classList.add('controls-slide-out', 'transition');
        graphDiv.classList.add('graph-slide-in', 'transition');
        twoDRenderingDiv.classList.add('two-d-rendering-slide-in', 'transition');

        // Listen for the transitionend event on any of the divs
        controlsDiv.addEventListener('transitionend', this.handleAnimationEnd.bind(this));
    },

    handleAnimationEnd: function(event) {
        console.log("Animation ended");
        // Remove the event listener to avoid multiple calls
        event.target.removeEventListener('transitionend', controller.handleAnimationEnd);

        // Display values and start plotting the graph
        this.displayValues();
    },

    displayValues: function() {
        // Display selected values in simulatorResultsDiv
        view.displaySelectedValues(model.selectedValues);
        console.log("Displayed selected values");

        // Extracting values from model.selectedValues
        const initialTemperature = Number(model.selectedValues.temperature.value);
        console.log("Initial temperature:", initialTemperature)
        const timeStep = Number(model.selectedValues.timeStep.value);
        console.log("Time step:", timeStep)
        const tilt = Number(model.selectedValues.collectorTilt.value);
        console.log("Tilt:", tilt)
        const LST = Number(model.selectedValues.time.value);
        console.log("LST:", LST)
        const n = model.dayOfYear(model.selectedValues.month.value, model.selectedValues.date.value);
        console.log("n:", n)

        // Compute volume: storageTankVolume + π * r^2 * h of pipe + collector volume
        const pipeRadius = Number(0.05); // Example: 5cm radius for a pipe
        const pipeVolume = Number(Number(Math.PI) * Number(Math.pow(pipeRadius, 2)) * Number(model.selectedValues.pipeLength.value));
        console.log("Pipe volume:", pipeVolume)
        const collectorVolume = Number(Number(model.selectedValues.collectorArea.value) * Number(model.selectedValues.collectorDepth.value));
        console.log("Collector volume:", collectorVolume)

        console.log("Storage tank volume:", Number(model.selectedValues.storageTankVolume.value))

        const volume = Number(Number(model.selectedValues.storageTankVolume.value)  + Number(pipeVolume) + Number(collectorVolume));
        console.log("Collector volume + Pipe Volume + Storage tank volume :", volume)
        // Start plotting the graph
        this.startGraphUpdate(n, initialTemperature, volume, timeStep, tilt, LST);
    },

    startGraphUpdate: function(n, initialTemperature, volume, timeStep, tilt, LST) {
        const targetTemperature = 85;
        let currentIndex = 0;
        let initialTime = 0;  // Setting the initialTime to 0

        let Tnew = initialTemperature;  // Initialize Tnew outside the interval

        // Ensure graphData arrays start with initial values
        model.graphData.xArray = [initialTime];
        model.graphData.yArray = [initialTemperature];

        let intervalId = setInterval(() => {
            // Get the new simulated data from the model
            const simulatedData = model.calculateTemperatureForNextStep(n, tilt, LST, initialTemperature, Tnew, volume, timeStep);

            // Update initialTemperature for the next iteration
            initialTemperature = simulatedData.newTemperature;
            Tnew = simulatedData.newTime;

            // Add data to the model's arrays
            model.graphData.xArray.push(simulatedData.newTime);
            model.graphData.yArray.push(simulatedData.newTemperature);

            // Update the graph using the view
            view.displayGraph(model.graphData.xArray, model.graphData.yArray);

            // Check if temperature reaches 85°C and stop if it does
            if (model.graphData.yArray[currentIndex] >= targetTemperature) {
                clearInterval(intervalId);
            }

            currentIndex++;
        }, 100);
    },

    /* Updating the month, based on selection from drop-down menu */
    handleMonthChange: function(event) {
        const selectedMonth = event.target.options[event.target.selectedIndex].text;
        if (selectedMonth !== '---Choose month---') { // check if a valid month is selected
            model.setMonth(selectedMonth);
            view.updateDateOptions(selectedMonth);
        }
    },

    /* Updating the date, based on selection from drop-down menu */
    handleDateChange: function(event) {
        const selectedDate = event.target.value;
        model.setDate(selectedDate);
    },

    /* Updating the time, based on selection from drop-down menu */
    handleTimeChange: function(event) {
        const selectedTime = event.target.options[event.target.selectedIndex].text;
        if (selectedTime !== '---Choose time---') { // check if a valid time is selected
            model.setTime(selectedTime);
        }
    },

    /* Updating the collector's area, based on value selected on slider */
    handleCollectorAreaChange: function(event) {
        const value = event.target.value;
        model.setCollectorArea(value);
        view.updateCollectorAreaDisplay(value);
    },

    /* Updating the collector's depth, based on value selected on slider */
    handleCollectorDepthChange: function(event) {
        const value = event.target.value;
        model.setCollectorDepth(value);
        view.updateCollectorDepthDisplay(value);
    },

    /* Updating the collector's tilt, based on value selected on slider */
    handleCollectorTiltChange: function(event) {
        const value = event.target.value;
        model.setCollectorTilt(value);
        view.updateCollectorTiltDisplay(value);
    },

    /* Updating the pipe's length, based on value selected on slider */
    handlePipeLengthChange: function(event) {
        const value = event.target.value;
        model.setPipeLength(value);
        view.updatePipeLengthDisplay(value);
    },

    /* Updating the storage tank's volume, based on value selected on slider */
    handleStorageTankVolumeChange: function(event) {
        const value = event.target.value;
        model.setStorageTankVolume(value);
        view.updateStorageTankVolumeDisplay(value);
    },

    /* Updating the temperature, based on value selected on slider */
    handleTemperatureChange: function(event) {
        const value = event.target.value;
        model.setTemperature(value);
        view.updateTemperatureDisplay(value);
    },

    handleTimeStepChange: function(event) {
        const value = event.target.value;
        model.setTimeStep(value);
        view.updateTimeStepDisplay(value);
    }
};

window.addEventListener('DOMContentLoaded', (event) => {
    controller.init(); // This sets up the application
});