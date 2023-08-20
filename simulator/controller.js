const controller = {
    /* Initializing the webpage */
    init: function() {
        this.setupEventListeners(); // setting up event listeners
        view.setScreenSplit(); // splitting the screen
        view.populateMonthDropdown(); // keeping drop-down menus populated
        view.renderScene(); // 3D rendering
    },

    /* Functions for different elements to respond to based on user interaction */
    setupEventListeners: function() {
        const monthListElem = document.getElementById("monthList");
        monthListElem.addEventListener('change', this.handleMonthChange);

        const dateListElem = document.getElementById("dateList");
        dateListElem.addEventListener('change', this.handleDateChange);

        const temperatureSlider = document.getElementById('temperature-slider');
        temperatureSlider.addEventListener('input', this.handleTemperatureChange);

        const collectorAreaSlider = document.getElementById('collector-area-slider');
        collectorAreaSlider.addEventListener('input', this.handleControllerAreaChange);

        const collectorDepthSlider = document.getElementById('collector-depth-slider');
        collectorDepthSlider.addEventListener('input', this.handleControllerDepthChange);
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
    handleControllerAreaChange: function(event) {
        const value = event.target.value;
        model.setCollectorArea(value);
        view.updateCollectorAreaDisplay(value);
    },

    /* Updating the collector depth, based on value selected on slider */
    handleControllerDepthChange: function(event) {
        const value = event.target.value;
        model.setCollectorDepth(value);
        view.updateCollectorDepthDisplay(value);
    }
};

window.addEventListener('DOMContentLoaded', (event) => {
    controller.init(); // This sets up the application
});