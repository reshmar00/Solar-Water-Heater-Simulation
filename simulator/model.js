const model = {

    /* Setting default values */
    selectedValues: {
        month: { label: 'Month', value: this.getMonth || 'January' },
        date: { label: 'Date', value: this.getDate || 1 },
        time: { label: 'Time', value: this.getTime || 12 },
        collectorArea: { label: 'Collector Area', value: this.getCollectorArea || 280.0 },
        collectorDepth: { label: 'Collector Depth', value: this.getCollectorDepth || 0.150 },
        collectorTilt: { label: 'Collector Tilt', value: this.getCollectorTilt || 45.0 },
        pipeLength: { label: 'Pipe Length', value: this.getPipeLength || 130.0 },
        storageTankVolume: { label: 'Storage Tank Volume', value: this.getStorageTankVolume || 1251.0 },
        temperature: { label: 'Starting Temperature', value: this.getTemperature || 47.5 },
        timeStep: { label: 'Time Step', value: this.getTimeStep || 0.1 },
    },

    graphData: {
        xArray: [],
        yArray: []
    },

    /* Constants */
    specificHeatOfWater: 4182.0, // J/kg°C
    densityOfWater: 1000.0, // kg/m^3

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

    dayOfYear: function (month, date) {
        const daysBeforeMonth = {
            'January': 0,
            'February': 31,
            'March': 59, //31 + 28
            'April': 90, //31 + 28 + 31,
            'May': 120, //31 + 28 + 31 + 30,
            'June': 151, //31 + 28 + 31 + 30 + 31,
            'July': 181, //31 + 28 + 31 + 30 + 31 + 30,
            'August': 212, //31 + 28 + 31 + 30 + 31 + 30 + 31,
            'September': 243, //31 + 28 + 31 + 30 + 31 + 30 + 31 + 31,
            'October': 273, //31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30,
            'November': 304, //31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31,
            'December': 334, //31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31 + 30
        };

        let myDate = Number(date);

        // Check if the month and date are valid
        if (!daysBeforeMonth.hasOwnProperty(month) || myDate < 1 || myDate > 31) {
            throw new Error('Invalid month or date');
        }

        // Sum the days before the current month with the given date
        return daysBeforeMonth[month] + myDate;
    },

    temperatureForDay: function (n) {
        if (n >= 1 && n <= 31) { // January
            return (4 - 3) / 2;
        } else if (n > 31 && n <= 59) { // February
            return (7 - 1) / 2;
        } else if (n > 59 && n <= 90) { // March
            return (13 + 3) / 2;
        } else if (n > 90 && n <= 120) { // April
            return (17 + 7) / 2;
        } else if (n > 120 && n <= 151) { // May
            return (22 + 11) / 2;
        } else if (n > 151 && n <= 181) { // June
            return (28 + 16) / 2;
        } else if (n > 181 && n <= 212) { // July
            return (32 + 20) / 2;
        } else if (n > 212 && n <= 243) { // August
            return (32 + 20) / 2;
        } else if (n > 243 && n <= 273) { // September
            return (26 + 14) / 2;
        } else if (n > 273 && n <= 304) { // October
            return (19 + 8) / 2;
        } else if (n > 304 && n <= 334) { // November
            return (10 + 2) / 2;
        } else if (n > 334 && n <= 365) { // December
            return (4 - 3) / 2;
        } else {
            return 0; // Invalid day number
        }
    },

    /*********** Calculations ***********/

    /* Main formula */
    calculateQcoll: function(n, tilt, LST, Tambient, Tfluid) {
        const FR_tau_alpha = 0.58;
        const FRUL = 0.7;

        let G = Number(this.calculateTotalRadiationOnCollector(n, tilt, LST));
        let deltaT = Tambient - Tfluid;

        let term1 = 10.0 * FR_tau_alpha * G;
        let term2 = FRUL * deltaT;
        let Qcoll = Number(term1 - term2);

        console.log("Qcoll:", Qcoll)
        return Qcoll;
    },

    computeNewTemperature: function (E, Told, volume){
        let Tnew = Told + (E / (volume * this.specificHeatOfWater * this.densityOfWater));
        console.log("T new:", Tnew);
        return Number(Tnew);
    },

    /* Supporting formulae / methods */

    degreesToRadians: function(degrees) {
        if (typeof degrees !== 'number') {
            throw new Error('Cannot convert string to radians');
        }

        if (degrees === Infinity) {
            throw new Error('Cannot divide by zero');
        }
        return Number(degrees * (Math.PI / 180.0));
        //return Number(parseFloat(String(degrees * (Math.PI / 180))).toFixed(6));
    },

    calculateCosineFromSine: function(sineValue){
        try {
            if (typeof sineValue !== 'number') {
                throw new Error('Input must be a number');
            }

            if (sineValue > 1 || sineValue < -1) {
                throw new Error('Input value must be between -1 and 1');
            }
            return Number(Math.sqrt(1.0 - Math.pow(sineValue, 2)));
            //return Number(parseFloat(Math.sqrt(1 - Math.pow(sineValue, 2)).toString()).toFixed(6));
        } catch (error) {
            throw error;
        }
    },

    calculateKT: function(n) {
        try {
            if (typeof n !== 'number') {
                throw new Error('Input must be a number');
            }

            if (n <= 0 || n > 365) {
                throw new Error('Input value must be between 1 and 365');
            }

            if (n === Infinity) {
                throw new Error('Input value cannot be infinity');
            }

            if ((n >= 349 && n <= 365) || (n >= 1 && n <= 45)) {  // Mid Dec+1, Jan, mid Feb
                return 0.3;
            } else if (n >= 46 && n <= 105) {  // Mid-Feb+1 - Mid-April
                return 0.4;
            } else if (n >= 106 && n <= 135) {  // Mid-April+1 - Mid-May
                return 0.6;
            } else if (n >= 136 && n <= 166) {  // Mid-May+1 - June end
                return 0.8;
            } else if (n >= 165 && n <= 181) {  // Mid-May+1 - June end
                return 0.7;
            } else if (n >= 182 && n <= 212) {  // July full - Mid-Aug
                return 0.6;
            } else if (n >= 213 && n <= 243) {  // Mid-Aug+1 - Full Sept
                return 0.5;
            } else if (n >= 244 && n <= 348) {  // Late Sept through Mid-November
                return 0.4;
            }
        } catch (error) {
            throw error;
        }
    },

    calculateExtraterrestrialRadiation: function(n) {
        const H0Avg = 1361; // Average solar constant in W/m2
        try {
            if (typeof n !== 'number') {
                throw new Error('Input must be a number');
            }

            if (!Number.isInteger(n) || n <= 0 || n > 365) {
                throw new Error('Input value must be an integer between 1 and 365');
            }

            if (n === Infinity) {
                throw new Error('Input value cannot be infinity');
            }

            // returning value after converting expression inside cosine
            // function to be in radians
            return Number(H0Avg * (1.0 + 0.034 * Math.cos((2.0 * Math.PI * n) / 365.0)));
            //return Number(parseFloat(String(H0Avg * (1 + 0.034 * Math.cos((2 * Math.PI * n) / 365)))).toFixed(6));
        } catch (error) {
            throw error;
        }
    },

    calculateRadiationAtSurface: function(H0, KT) {
        try {
            if (typeof H0 !== 'number' || typeof KT !== 'number') {
                throw new Error('Input must be a number');
            }

            if (KT < 0.3 || KT > 0.8) {
                throw new Error('Input value must be a number between 0.3 and 0.8');
            }

            if (H0 === Infinity || KT === Infinity) {
                throw new Error('Input value cannot be infinity');
            }
            return Number(H0 * KT);
            //return Number(parseFloat(String(H0 * KT)).toFixed(6));
        } catch (error) {
            throw error;
        }
    },

    calculateSolarDeclinationInDegrees: function(n) {
        try {
            if (typeof n !== 'number') {
                throw new Error('Input must be a number');
            }

            if (!Number.isInteger(n) || n <= 0 || n > 365) {
                throw new Error('Input value must be an integer between 1 and 365');
            }

            if (n === Infinity) {
                throw new Error('Input value cannot be infinity');
            }
            let numerator = 284.0 + n;
            const denominator = 365.0;
            let mixedFraction = numerator / denominator;
            let angle = 2.0 * Math.PI * mixedFraction;
            return Number(23.45 * Math.sin(angle));
            //return Number(parseFloat(String(23.45 * Math.sin(angle))).toFixed(6));
        } catch (error) {
            throw error;
        }
    },

    calculateSolarDeclination: function(n) {
        try {
            if (typeof n !== 'number') {
                throw new Error('Input must be a number');
            }

            if (!Number.isInteger(n) || n <= 0 || n > 365) {
                throw new Error('Input value must be an integer between 1 and 365');
            }

            if (n === Infinity) {
                throw new Error('Input value cannot be infinity');
            }
            let numerator = 284.0 + n;
            const denominator = 365.0;
            let mixedFraction = numerator / denominator;
            let angle = 2.0 * Math.PI * mixedFraction;
            return Number(this.degreesToRadians(23.45 * Math.sin(angle))); // angle in degrees converted to radians
            //return Number(parseFloat(String(this.degreesToRadians(23.45 * Math.sin(angle)))).toFixed(6));
        } catch (error) {
            throw error;
        }
    },

    calculateOmegaFromLST(LST) {
        /* We have made some assumptions here (*)
         * refer to the readme for more details */
        try {
            if (typeof LST !== 'number') {
                throw new Error('Input must be a number');
            }
            if (!Number.isInteger(LST) || LST < 1 || LST > 24) {
                throw new Error('Input value must be a number between 1 and 24');
            }
            if (LST === Infinity) {
                throw new Error('Input value cannot be infinity');
            }
            return Number(this.degreesToRadians(15.0 * (LST - 12.0)));
            //return Number(parseFloat(String(this.degreesToRadians(15 * (LST - 12)))).toFixed(6));
        } catch (error) {
            throw error;
        }
    },

    calculateOmegaS(latitudeInRadians, solarDeclinationInRadians) {
        let cosOmegaS = -Math.tan(latitudeInRadians) * Math.tan(solarDeclinationInRadians);
        return Number(Math.acos(cosOmegaS));
        //return Number(parseFloat(String(Math.acos(cosOmegaS))).toFixed(6));
    },

    calculateRb: function(n, tilt, LST) {
        try {
            if (typeof n !== 'number' || typeof tilt !== 'number' || typeof LST !== 'number') {
                throw new Error('Input must be a number');
            }
            if (!Number.isInteger(n) || n <= 0 || n > 365) {
                throw new Error('Input value must be an integer between 1 and 365');
            }
            if (tilt < 0 || tilt > 90) {
                throw new Error('Input value must be an integer between 0 and 90');
            }
            if (!Number.isInteger(LST) || LST < 1 || LST > 24) {
                throw new Error('Input value must be an integer between 1 and 24');
            }
            if (!Number.isFinite(n) || !Number.isFinite(tilt) || !Number.isFinite(LST)) {
                throw new Error('Input value cannot be infinity');
            }
            const latInRadians = 0.686280915;

            // Calculate solar declination (δ) -- in radians
            let solarDeclination = Number(this.calculateSolarDeclination(n));

            let omegaInRadians = Number(this.calculateOmegaFromLST(LST))
            // Check that it makes sense, given the sunset hour angle (ωs)
            let omegaS = Number(this.calculateOmegaS(latInRadians, solarDeclination))

            // Sun below the horizon
            if (Math.abs(Number(omegaInRadians)) > omegaS) {
                return 0;  // handled by returning 0
            }

            // Get cosine of omega
            let cosOmega = Math.cos(Number(omegaInRadians));

            let phi = Number(this.degreesToRadians(tilt));
            // Get its sine and cosine
            let cosPhi = Math.cos(phi);
            let sinPhi = Math.sin(phi);

            // Calculate artificial latitude calculated by subtracting
            // the tilt from the latitude
            let phiMinusBeta = latInRadians - phi;
            // Get its sine and cosine
            let cosPhiMinusBeta = Math.cos(phiMinusBeta);
            let sinPhiMinusBeta = Math.sin(phiMinusBeta);

            // Get its sine and cosine
            let cosSolarDeclination = Math.cos(solarDeclination);
            let sinSolarDeclination = Math.sin(solarDeclination);

            // Calculate numerator
            let numerator = cosSolarDeclination * cosOmega * cosPhiMinusBeta + sinSolarDeclination * sinPhiMinusBeta;

            // Calculate denominator
            let denominator = cosPhi * cosSolarDeclination * cosOmega + sinPhi * sinSolarDeclination;

            // Division by almost-zero check
            const epsilon = 1e-10;
            if (Math.abs(denominator) < epsilon) {
                throw new Error('Denominator too close to zero');
            }

            // Calculate and return the quotient, Rb
            return Number(numerator / denominator);
            //return Number(parseFloat(String(numerator / denominator)).toFixed(6));
        } catch (error) {
            throw error;
        }
    },

    calculateTotalRadiationOnCollector: function(n, tilt, LST) {
        // Calculate extraterrestrial radiation (H0) and KT
        let H0 = Number(this.calculateExtraterrestrialRadiation(n));
        let KT = this.calculateKT(n);

        // Calculate radiation at the Earth's surface (H)
        let H = Number(this.calculateRadiationAtSurface(H0, KT));

        // Calculate Rb
        let Rb = Number(this.calculateRb(n, tilt, LST));

        // Calculate direct/beam radiation on tilted surface (IbT)
        let directRadiationTilted = Number(H * Rb);

        // Calculate diffuse radiation on tilted surface (IdT)
        let diffuseRadiationTilted = H * ((1.0 + Math.cos(Number(this.degreesToRadians(tilt)))) / 2.0);

        // Calculate reflected radiation on tilted surface (IrT)
        let reflectedRadiationTilted = 0.2 * diffuseRadiationTilted;

        // Calculate total radiation on collector (G)
        return Number(directRadiationTilted + diffuseRadiationTilted + reflectedRadiationTilted);
        //return Number(parseFloat(String(directRadiationTilted + diffuseRadiationTilted + reflectedRadiationTilted)).toFixed(6));
    },

    calculateTemperatureForNextStep: function(n, tilt, LST, Told, Tnew, V) {
        // Constants
        const C = 4182; // specific heat of water in J/kg°C
        const rho = 1000; // density of water in kg/m^3

        // Calculate Qcoll with the current guess of Tnew
        let Qcoll = Number(this.calculateQcoll(n, tilt, LST, Told, Tnew));

        // Calculate the new temperature Tnew using the formula
        //Tnew = Told + (Qcoll / (C * rho * V));
        Tnew = Number(parseFloat(String(Told + (Qcoll / (C * rho * V)))).toFixed(2));
        // Add Tnew to yArray
        // this.graphData.yArray.push(Tnew);

        // Update elapsed time based on the timeStep and add it to xArray
        // let updatedTime = this.graphData.xArray.length === 0
        //     ? Number(timeStep)
        //     : Number(this.graphData.xArray[this.graphData.xArray.length - 1]) + Number(timeStep);
        //
        // let newTime = parseFloat(updatedTime.toFixed(6));

        // console.log("newTime:", newTime, "newValue:", Tnew);
        // console.log("Told:", Told, "Qcoll:", Qcoll, "Calculated Tnew:", Tnew);

        // this.graphData.xArray.push(newTime);
        return Tnew;
    }
};

//module.exports = model;
if (typeof module !== 'undefined' && module.exports) {
    module.exports = model;
}