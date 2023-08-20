/* Logic for reading user inputs */

const model = {

    /* Setting default values */
    selectedValues: {
        month: { label: 'Month', value: 'January' },
        date: { label: 'Date', value: 1 },
        time: { label: 'Time', value: 12 },
        collectorArea: { label: 'Collector Area', value: 280.0 },
        collectorDepth: { label: 'Collector Depth', value: 0.150 },
        collectorTilt: { label: 'Collector Tilt', value: 45.0 },
        pipeLength: { label: 'Pipe Length', value: 130.0 },
        storageTankVolume: { label: 'Storage Tank Volume', value: 1251.0 },
        temperature: { label: 'Starting Temperature', value: 47.5 },
    },

    /* Getters and setters */

    setMonth: function(month) {
        this.selectedValues.month.value = month;
    },
    getMonth: function() {
        return this.selectedValues.month.value;
    },

    setDate: function(date) {
        this.selectedValues.date.value = date;
    },
    getDate: function() {
        return this.selectedValues.date.value;
    },

    setTime: function(time) {
        this.selectedValues.time.value = time;
    },
    getTime: function() {
        return this.selectedValues.time.value;
    },

    setCollectorArea: function(collectorArea) {
        this.selectedValues.collectorArea.value = collectorArea;
    },
    getCollectorArea: function() {
        return this.selectedValues.collectorArea.value;
    },

    setCollectorDepth: function(collectorDepth) {
        this.selectedValues.collectorDepth.value = collectorDepth;
    },
    getCollectorDepth: function() {
        return this.selectedValues.collectorDepth.value;
    },

    setCollectorTilt: function(collectorTilt) {
        this.selectedValues.collectorTilt.value = collectorTilt;
    },
    getCollectorTilt: function() {
        return this.selectedValues.collectorTilt.value;
    },

    setPipeLength: function(pipeLength) {
        this.selectedValues.pipeLength.value = pipeLength;
    },
    getPipeLength: function() {
        return this.selectedValues.pipeLength.value;
    },

    setStorageTankVolume: function(storageTankVolume) {
        this.selectedValues.storageTankVolume.value = storageTankVolume;
    },
    getStorageTankVolume: function() {
        return this.selectedValues.storageTankVolume.value;
    },

    setTemperature: function(temp) {
        this.selectedValues.temperature.value = temp;
    },
    getTemperature: function() {
        return this.selectedValues.temperature.value;
    }
};