const controller = {
    /* Initializing the webpage */
    init: function() {
        this.setupEventListeners(); // setting up event listeners
        view.populateMonthDropdown(); // keeping drop-down menus populated
        view.renderScene(); // 3D rendering
    },

    /* Functions for different elements to respond to based on user interaction */
    setupEventListeners: function() {
        const monthListElem = document.getElementById("month");
        monthListElem.addEventListener('change', this.handleMonthChange);

        const dateListElem = document.getElementById("date");
        dateListElem.addEventListener('change', this.handleDateChange);

        const temperatureSlider = document.getElementById('temperature');
        temperatureSlider.addEventListener('input', this.handleTemperatureChange);

        const collectorAreaSlider = document.getElementById('collector-area');
        collectorAreaSlider.addEventListener('input', this.handleCollectorAreaChange);

        const collectorDepthSlider = document.getElementById('collector-depth');
        collectorDepthSlider.addEventListener('input', this.handleCollectorDepthChange);

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

    /* Updating the temperature, based on value selected on slider */
    handleTemperatureChange: function(event) {
        const value = event.target.value;
        model.setTemperature(value);
        view.updateTemperatureDisplay(value);
    },

    /* Updating the collector area, based on value selected on slider */
    handleCollectorAreaChange: function(event) {
        const value = event.target.value;
        model.setCollectorArea(value);
        view.updateCollectorAreaDisplay(value);
    },

    /* Updating the collector depth, based on value selected on slider */
    handleCollectorDepthChange: function(event) {
        const value = event.target.value;
        model.setCollectorDepth(value);
        view.updateCollectorDepthDisplay(value);
    }
};

window.addEventListener('DOMContentLoaded', (event) => {
    controller.init(); // This sets up the application
});