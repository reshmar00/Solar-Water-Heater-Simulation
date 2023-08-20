const model = {
    /* Logic for reading user inputs */

    temperature: 50,  // Default value
    month: "January", // Default value
    date: 1, // Default value
    collectorArea: 5, // Default value
    collectorDepth: 0.10, // Default value
    /* Getters and setters */

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

    setTemperature: function(temp) {
        this.temperature = temp;
    },
    getTemperature: function() {
        return this.temperature;
    },

    setCollectorArea: function(collectorArea) {
        this.collectorArea = collectorArea;
    },
    getCollectorArea: function() {
        return this.collectorArea;
    },

    setCollectorDepth: function(collectorDepth) {
        this.collectorDepth = collectorDepth;
    },
    getCollectorDepth: function() {
        return this.collectorDepth;
    }
};