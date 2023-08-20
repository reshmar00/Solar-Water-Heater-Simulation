/* Logic for reading user inputs */

const model = {

    /* Setting default values */
    month: "January", // Default value
    date: 1, // Default value
    time: 12, // Default values
    collectorArea: 280.0, // Default value
    collectorDepth: 0.150, // Default value
    collectorTilt: 45.0, // Default value
    pipeLength: 130.0, // Default value
    storageTankVolume: 1251.0, // Default value
    temperature: 47.5,  // Default value

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

    setTime: function(time) {
        this.time = time;
    },
    getTime: function() {
        return this.time;
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
    },

    setCollectorTilt: function(collectorTilt) {
        this.collectorTilt = collectorTilt;
    },
    getCollectorTilt: function() {
        return this.collectorTilt;
    },

    setPipeLength: function(pipeLength) {
        this.pipeLength = pipeLength;
    },
    getPipeLength: function() {
        return this.pipeLength;
    },

    setStorageTankVolume: function(storageTankVolume) {
        this.storageTankVolume = storageTankVolume;
    },
    getStorageTankVolume: function() {
        return this.storageTankVolume;
    },

    setTemperature: function(temp) {
        this.temperature = temp;
    },
    getTemperature: function() {
        return this.temperature;
    }
};