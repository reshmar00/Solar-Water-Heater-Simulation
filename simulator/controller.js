const controller = {
    /* Initializing the webpage */
    init: function() {
        /* setting up event listeners */
        this.setupEventListeners();

        /* keeping drop-down menus populated */
        view.populateMonthDropdown();
        view.populateTimeDropdown();

        /* 3D rendering */
        view.renderScene();
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
            { id: 'startSimulator', event: 'click', handler: this.startSimulator },
            { id: 'time-step', event: 'input', handler: this.handleTimeStepChange }
        ];

        console.log("Event listener for 'Start Simulator' button added.");

        inputListeners.forEach(item => {
            const element = document.getElementById(item.id);
            element.addEventListener(item.event, item.handler.bind(this));
        });

        window.addEventListener('resize', this.handleWindowResize);
    },

    startSimulator: function() {
        console.log("Entered startSimulator function");

        // Display selected values in simulatorResultsDiv
        const { Qcoll, finalTime } = model.simulateTemperatureChange(n, tilt, initialTemperature, timeStep);
        view.displaySelectedValues(model.selectedValues, Qcoll, finalTime);

        // Apply classes to trigger sliding animations
        const leftDiv = document.querySelector('.left');
        const rightDiv = document.querySelector('.right');
        const simulatorResultsDiv = document.querySelector('.simulator-results');

        leftDiv.classList.add('left-slide-out', 'transition');
        rightDiv.classList.add('right-slide-in', 'transition');
        simulatorResultsDiv.classList.add('simulator-results-slide-in', 'transition');

        // Listen for the transitionend event on any of the divs
        leftDiv.addEventListener('transitionend', this.handleAnimationEnd);
        console.log("Exiting startSimulator function");
    },

    handleAnimationEnd: function(event) {
        // Remove the event listener to avoid multiple calls
        event.target.removeEventListener('transitionend', controller.handleAnimationEnd);

        // Now that the sliding animations are complete, render the scene
        view.renderScene();
    },

    handleWindowResize: function(){
        const container = document.querySelector('.right');
        view.renderer.setSize(container.clientWidth, container.clientHeight);
        view.camera.aspect = container.clientWidth / container.clientHeight;
        view.camera.updateProjectionMatrix();
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