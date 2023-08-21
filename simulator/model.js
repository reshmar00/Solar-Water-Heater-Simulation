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
        timeStep: { label: 'Time Step', value: 0.1 },
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
    },

    setTimeStep: function(timeStep) {
        this.selectedValues.timeStep.value = timeStep;
    },
    getTimeStep: function() {
        return this.selectedValues.timeStep.value;
    },

    /*********** Calculations ***********/

    /* Main formula */
    calculateQcoll: function(n, tilt, Told, Tnew) {
        const FR_tau_alpha = 0.58;
        const FRUL = 0.7;

        const G = this.calculateTotalRadiationOnCollector(n, tilt);
        const deltaT = Tnew - Told;

        return FR_tau_alpha * G - FRUL * deltaT;
    },

    calculateRadiationAtSurface: function(H0, KT) {
        const H = H0 * KT;
        return H;
    },

    calculateTotalRadiationOnCollector: function(n, tilt) {
        // Calculate extraterrestrial radiation (H0) and KT
        const extraterrestrialRadiation = this.calculateExtraterrestrialRadiation(n);
        const KT = this.calculateKT(n); // You need to define the calculateKT function

        // Calculate radiation at the Earth's surface (H)
        const radiationAtSurface = this.calculateRadiationAtSurface(extraterrestrialRadiation, KT);

        // Calculate Rb
        const Rb = this.calculateRb(n, tilt);

        // Calculate direct/beam radiation on tilted surface (IbT)
        const directRadiationTilted = radiationAtSurface * Rb;

        // Calculate diffuse radiation on tilted surface (IdT)
        const diffuseRadiationTilted = radiationAtSurface * ((1 + Math.cos(this.degreesToRadians(tilt))) / 2);

        // Calculate reflected radiation on tilted surface (IrT)
        const reflectedRadiationTilted = 0.2 * diffuseRadiationTilted;

        // Calculate total radiation on collector (G)
        return directRadiationTilted + diffuseRadiationTilted + reflectedRadiationTilted;
    },

    calculateExtraterrestrialRadiation: function(n) {
        const H0Avg = 1361; // Average solar constant in W/m2
        return H0Avg * (1 + 0.034 * Math.cos((360 * n) / 365));
    },

    calculateCosineFromSine: function(sineValue){
        return Math.sqrt(1 - Math.pow(sineValue, 2));
    },

    calculateRb: function(n, tilt) {
        // Calculate solar declination (δ)
        const solarDeclination = this.calculateSolarDeclination(n);

        // Calculate sin(αs)
        const sinAlphaS = Math.sin(solarDeclination) * Math.sin(latitudeRadians) +
            Math.cos(solarDeclination) * Math.cos(latitudeRadians) * Math.tan(latitudeRadians) * Math.tan(solarDeclination);

        // Calculate cos(αs)
        const cosAlphaS = this.calculateCosineFromSine(sinAlphaS);

        // Calculate cos(θ) using assumed γs
        const angleTheta = sinAlphaS * Math.cos(this.degreesToRadians(tilt)) +
            cosAlphaS * Math.sin(this.degreesToRadians(tilt)) * Math.cos(Math.PI - this.degreesToRadians(180)); // Using fixed azimuth angle

        // Calculate Rb
        return sinAlphaS / angleTheta;
    },

    calculateSolarDeclination: function(n) {
        const numerator = 284 + n;
        const denominator = 365;
        const mixedFraction = numerator / denominator;
        const angleInRadians = 2 * Math.PI * mixedFraction;
        return 23.45 * Math.sin(angleInRadians);
    },

    degreesToRadians: function(degrees) {
        return degrees * (Math.PI / 180);
    },

    calculateKT: function(n) {
        if ((n >= 349 && n <= 365) || (n >= 1 && n <= 45)) {  // Mid Dec+1, Jan, mid Feb
            return 0.3;
        } else if (n >= 46 && n <= 105) {  // Mid Feb+1 - Mid April
            return 0.4;
        } else if (n >= 106 && n <= 135) {  // Mid April+1 - Mid May
            return 0.6;
        } else if (n >= 136 && n <= 166) {  // Mid May+1 - June end
            return 0.8;
        } else if (n >= 182 && n <= 212) {  // July full - Mid Aug
            return 0.7;
        } else if (n >= 213 && n <= 243) {  // Mid Aug+1 - Full Sept
            return 0.6;
        } else if (n >= 274 && n <= 319) {  // October full - Mid November
            return 0.5;
        } else if (n >= 320 && n <= 348) {  // Mid Nov+1 - Mid Dec
            return 0.4;
        } else {
            return 0.3;  // Default to overcast
        }
    },

    simulateTemperatureChange: function(n, tilt, initialTemperature, timeStep) {
        let T = initialTemperature;
        let Tnew = initialTemperature;
        const targetTemperature = 85;
        let time = 0;

        while (Tnew < targetTemperature) {
            T = Tnew;
            Tnew += timeStep * calculateQcoll(n, tilt, T, Tnew);
            time += timeStep;
        }

        return { Qcoll: calculateQcoll(n, tilt, T, Tnew), finalTime: time };
    },
};