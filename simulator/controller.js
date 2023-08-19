const controller = {
    init: function() {
        this.setupEventListeners();
        view.setScreenSplit();
        view.populateMonthDropdown();
        view.renderScene();
    },

    setupEventListeners: function() {
        const temperatureSlider = document.getElementById('temperature-slider');
        temperatureSlider.addEventListener('input', this.handleTemperatureChange);

        const monthListElem = document.getElementById("monthList");
        monthListElem.addEventListener('change', this.handleMonthChange);

        const dateListElem = document.getElementById("dateList");
        dateListElem.addEventListener('change', this.handleDateChange);
    },

    handleTemperatureChange: function(event) {
        const value = event.target.value;
        model.setTemperature(value);
        view.updateTemperatureDisplay(value);
    },

    handleMonthChange: function(event) {
        const selectedMonth = event.target.selectedIndex - 1;  // Subtracting 1 to start January from 0
        if (selectedMonth >= 0) { // check if a valid month is selected
            model.setMonth(selectedMonth);
            view.updateDateOptions(selectedMonth);
        }
    },

    handleDateChange: function(event) {
        const selectedDate = event.target.value;
        model.setDate(selectedDate);
    }
};


window.addEventListener('DOMContentLoaded', (event) => {
    controller.init(); // This sets up the application
});