const model = {
    temperature: 50,  // Default value
    month: null,
    date: null,
    daysInMonths: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

    setTemperature: function(temp) {
        this.temperature = temp;
    },
    getTemperature: function() {
        return this.temperature;
    },

    setMonth: function(month) {
        this.month = month;
    },
    getMonth: function() {
        return this.month;
    },

    setDate: function(date) {
        this.date = date;
    },
    getDate: function() {
        return this.date;
    },

    getDaysInMonth: function(monthIndex) {
        return this.daysInMonths[monthIndex];
    }
};