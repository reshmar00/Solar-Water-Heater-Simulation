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
        const monthListElem = document.getElementById("month");
        monthListElem.addEventListener('change', this.handleMonthChange);

        const dateListElem = document.getElementById("date");
        dateListElem.addEventListener('change', this.handleDateChange);

        const timeListElem = document.getElementById("time");
        timeListElem.addEventListener('change', this.handleTimeChange);

        const collectorAreaSlider = document.getElementById('collector-area');
        collectorAreaSlider.addEventListener('input', this.handleCollectorAreaChange);

        const collectorDepthSlider = document.getElementById('collector-depth');
        collectorDepthSlider.addEventListener('input', this.handleCollectorDepthChange);

        const collectorTiltSlider = document.getElementById('collector-tilt');
        collectorTiltSlider.addEventListener('input', this.handleCollectorTiltChange);

        const pipeLengthSlider = document.getElementById('pipe-length');
        pipeLengthSlider.addEventListener('input', this.handlePipeLengthChange);

        const storageTankVolumeSlider = document.getElementById('storage-tank-volume');
        storageTankVolumeSlider.addEventListener('input', this.handleStorageTankVolumeChange);

        const temperatureSlider = document.getElementById('temperature');
        temperatureSlider.addEventListener('input', this.handleTemperatureChange);

        const startSimulatorButton = document.getElementById('startSimulator');
        startSimulatorButton.addEventListener('click', this.startSimulator);

        window.addEventListener('resize', function() {
            const container = document.querySelector('.right');
            renderer.setSize(container.clientWidth, container.clientHeight);
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
        });
    },

    startSimulator: function() {
        const leftDiv = document.querySelector('.left');
        const rightDiv = document.querySelector('.right');
        const simulatorResultsDiv = document.querySelector('.simulator-results');

        // Make the left div slide away to the left
        leftDiv.style.width = '0%';
        leftDiv.style.left = '-40%'; // Push it out of view

        // Make the right div occupy same width, but moved to the left
        rightDiv.style.width = '60%';
        rightDiv.style.left = '0';

        // Bring in simulator-results div
        simulatorResultsDiv.style.width = '40%';
        simulatorResultsDiv.style.left = '60%';

        // Now let's ensure the THREE.js visualization is being rendered
        view.renderScene();
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

    /* Updating the temperature, based on value selected on slider */
    handleTemperatureChange: function(event) {
        const value = event.target.value;
        model.setTemperature(value);
        view.updateTemperatureDisplay(value);
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
    }
};

window.addEventListener('DOMContentLoaded', (event) => {
    controller.init(); // This sets up the application
});