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
        const temperatureSlider = document.getElementById('temperature-slider');
        temperatureSlider.addEventListener('input', this.handleTemperatureChange);

        const monthListElem = document.getElementById("monthList");
        monthListElem.addEventListener('change', this.handleMonthChange);

        const dateListElem = document.getElementById("dateList");
        dateListElem.addEventListener('change', this.handleDateChange);
    },

    /* Updating the temperature, based on value selected on slider */
    handleTemperatureChange: function(event) {
        const value = event.target.value;
        model.setTemperature(value);
        view.updateTemperatureDisplay(value);
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
    }
};

window.addEventListener('DOMContentLoaded', (event) => {
    controller.init(); // This sets up the application
});