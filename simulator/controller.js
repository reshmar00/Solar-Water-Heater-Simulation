/* MVC Architecture */
/**
 * Controller - Acts as an intermediary between the Model and View.
 * Processes user inputs from the View, updates the Model, and refreshes the View.
 * Orchestrates the application's flow and behavior.
 */

let intervalId;

const controller = {
    /* Initializing the webpage */
    init: function() {
        /* setting up event listeners */
        this.setupEventListeners();

        /* keeping drop-down menus populated */
        view.populateMonthDropdown();
        view.populateTimeDropdown();

        /* initialize empty graph for simulation */
        view.initEmptySimulation();
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
            { id: 'stopSimulator', event: 'click', handler: this.stopSimulator }
        ];

        inputListeners.forEach(item => {
            const element = document.getElementById(item.id);
            element.addEventListener(item.event, item.handler.bind(this));
        });
    },

    stopSimulator: function() {
        clearInterval(intervalId);
    },

    startSimulator: function() {
        console.log("Entered startSimulator function");

        // Display values and start plotting the graph

        // Show the graph div
        const graphDiv = document.querySelector('.graph');
        graphDiv.style.display = 'block';

        // Initialize or fetch model values
        if (window.innerWidth <= 768) {
            console.log("Entered 768 pixels and below zone")
            this.triggerAnimations();
        }
        else {
            this.displayValues();
        }

    },

    triggerAnimations: function() {
        console.log("Starting trigger animations function");
        const controlsDiv = document.querySelector('.controls');
        const graphDiv = document.querySelector('.graph');

        // Apply classes to trigger sliding animations
        controlsDiv.classList.add('controls-slide-out', 'transition');
        graphDiv.classList.add('graph-slide-in', 'transition');

        // Listen for the transitionend event on the controls div
        controlsDiv.addEventListener('transitionend', this.handleAnimationEnd.bind(this));
        console.log("Ending trigger animations function");
    },

    handleAnimationEnd: function(event) {
        console.log("Animation ended");

        // Remove the event listener to avoid multiple calls
        event.target.removeEventListener('transitionend', controller.handleAnimationEnd);

        // Hide the controls div
        const controlsDiv = document.querySelector('.controls');
        controlsDiv.style.display = 'none';

        // Reset the translation for the graph div
        const graphDiv = document.querySelector('.graph');
        graphDiv.style.transform = 'translateX(0)';

        // Display values and start plotting the graph
        console.log("Starting to display values");
        this.displayValues();
    },

    displayValues: function() {
        console.log("Displaying values");
        console.log(model.selectedValues);

        // Extracting values from model.selectedValues
        let TStart = Number(model.selectedValues.temperature.value);
        let timeStep = Number(model.selectedValues.timeStep.value);
        let collectorTilt = Number(model.selectedValues.collectorTilt.value);
        let timeOfDay = model.timeOfDay(model.selectedValues.time.value);
        let dayOfYear = model.dayOfYear(model.selectedValues.month.value, model.selectedValues.date.value);
        let volume =  model.computeTotalVolume();

        // Start the simulation
        this.startSimulation(dayOfYear, TStart, volume, timeStep, collectorTilt, timeOfDay);
    },

    startSimulation: function(dayOfYear, TStart, volume, timeStep, collectorTilt, timeOfDay) {
        const targetTemperature = 85;
        let currentIndex = 0;
        let initialTime = 0;  // Setting the initialTime to 0
        let currentTime = initialTime;

        // Ensure arrays start with initial values
        model.simulationData.xArrayTime = [initialTime];
        model.simulationData.yArrayTemp = [TStart];

        let TOld = TStart;
        let TAmbient = Number(model.temperatureForDay(dayOfYear));

        let TNew = TOld;

        // Subsequent iterations, TNew - TOld
        intervalId = setInterval(() => {
            console.log("Interval running, current iteration:", currentIndex);

            // Calculate amount of heat energy generated by solar heater
            let G = model.calculateTotalRadiationOnCollector(dayOfYear, collectorTilt, timeOfDay)
            let QCollector = model.calculateEnergyCollected(G, TAmbient, TOld);

            // QCollector is in units of J/m^2s ; we need it in Joule
            let E = QCollector * model.getCollectorArea() * timeStep;

            // Update the temperature based on this energy
            TNew = model.computeNewTemperature(E, TOld, volume);
            TOld = TNew;

            // Update time
            currentTime = currentTime + timeStep;

            // Add data to the model's arrays
            model.simulationData.xArrayTime.push(currentTime.toFixed(3));
            model.simulationData.yArrayTemp.push(TNew);

            // Update the graph using the view
            view.displaySimulation(model.simulationData.xArrayTime, model.simulationData.yArrayTemp);

            // Check if temperature reaches 85°C and stop if it does
            if (TNew >= targetTemperature) {
                clearInterval(intervalId);
            }

            currentIndex++;
        }, 400);
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

    /* Updating the collector's collectorTilt, based on value selected on slider */
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