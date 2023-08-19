const model = {
    /* Logic for reading user inputs */

    temperature: 50,  // Default value
    month: "January", // Default value
    date: 1, // Default value

    /* Getters and setters */
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
    }
};