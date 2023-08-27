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

    graphData: {
        xArray: [],
        yArray: []
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
    calculateQcoll: function(n, tilt, LST, Told, Tnew) {
        const FR_tau_alpha = 0.58;
        const FRUL = 0.7;

        const G = this.calculateTotalRadiationOnCollector(n, tilt, LST);
        const deltaT = Tnew - Told;

        return FR_tau_alpha * G - FRUL * deltaT;
    },

    /* Supporting formulae / methods */

    degreesToRadians: function(degrees) {
        if (typeof degrees !== 'number') {
            throw new Error('Cannot convert string to radians');
        }

        if (degrees === Infinity) {
            throw new Error('Cannot divide by zero');
        }

        return degrees * (Math.PI / 180);
    },

    calculateCosineFromSine: function(sineValue){
        try {
            if (typeof sineValue !== 'number') {
                throw new Error('Input must be a number');
            }

            if (sineValue > 1 || sineValue < -1) {
                throw new Error('Input value must be between -1 and 1');
            }

            return Math.sqrt(1 - Math.pow(sineValue, 2));
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
            } else if (n >= 46 && n <= 105) {  // Mid Feb+1 - Mid April
                return 0.4;
            } else if (n >= 106 && n <= 135) {  // Mid April+1 - Mid May
                return 0.6;
            } else if (n >= 136 && n <= 166) {  // Mid May+1 - June end
                return 0.8;
            } else if (n >= 165 && n <= 181) {  // Mid May+1 - June end
                return 0.7;
            } else if (n >= 182 && n <= 212) {  // July full - Mid Aug
                return 0.6;
            } else if (n >= 213 && n <= 243) {  // Mid Aug+1 - Full Sept
                return 0.5;
            } else if (n >= 244 && n <= 348) {  // Late Sept through Mid November
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
            return H0Avg * (1 + 0.034 * Math.cos((2 * Math.PI * n) / 365));

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

            return H0 * KT;
        } catch (error) {
            throw error;
        }
    },

    nextDataPoint: function() {
        const startingTemp = this.selectedValues.temperature.value;
        const targetTemp = 85;
        const totalSecondsFor1CIncrease = 102;
        const timeStepInSeconds = this.selectedValues.timeStep.value;
        const tempIncreasePerTimeStep = 1 / (totalSecondsFor1CIncrease / timeStepInSeconds);
        const lastTemperature = this.graphData.yArray[this.graphData.yArray.length - 1] || startingTemp;

        if (lastTemperature >= targetTemp) {
            return false;
        }

        const nextTemperature = lastTemperature + tempIncreasePerTimeStep;
        const nextTime = (this.graphData.xArray[this.graphData.xArray.length - 1] || 0) + timeStepInSeconds;

        this.graphData.xArray.push(nextTime);
        this.graphData.yArray.push(nextTemperature);

        return true;
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
            const numerator = 284 + n;
            const denominator = 365;
            const mixedFraction = numerator / denominator;
            const angle = 2 * Math.PI * mixedFraction;
            return 23.45 * Math.sin(angle);
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
            const numerator = 284 + n;
            const denominator = 365;
            const mixedFraction = numerator / denominator;
            const angle = 2 * Math.PI * mixedFraction;
            return this.degreesToRadians(23.45 * Math.sin(angle)); // angle in degrees converted to radians
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
            return this.degreesToRadians(15 * (LST - 12));
        } catch (error) {
            throw error;
        }
    },

    calculateOmegaS(latitudeInRadians, solarDeclinationInRadians) {
        const cosOmegaS = -Math.tan(latitudeInRadians) * Math.tan(solarDeclinationInRadians);
        return Math.acos(cosOmegaS);
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
            const solarDeclination = this.calculateSolarDeclination(n);

            const omegaInRadians = this.calculateOmegaFromLST(LST);
            // Check that it makes sense, given the sunset hour angle (ωs)
            const omegaS = this.calculateOmegaS(latInRadians, solarDeclination)

            // Sun below the horizon
            if (Math.abs(omegaInRadians) > omegaS) {
                return 0;  // handled by returning 0
            }

            // Get cosine of omega
            const cosOmega = Math.cos(omegaInRadians);

            const phi = this.degreesToRadians(tilt);
            // Get its sine and cosine
            const cosPhi = Math.cos(phi);
            const sinPhi = Math.sin(phi);

            // Calculate artificial latitude calculated by subtracting
            // the tilt from the latitude
            const phiMinusBeta = latInRadians - phi;
            // Get its sine and cosine
            const cosPhiMinusBeta = Math.cos(phiMinusBeta);
            const sinPhiMinusBeta = Math.sin(phiMinusBeta);

            // Get its sine and cosine
            const cosSolarDeclination = Math.cos(solarDeclination);
            const sinSolarDeclination = Math.sin(solarDeclination);

            // Calculate numerator
            const numerator = cosSolarDeclination * cosOmega * cosPhiMinusBeta + sinSolarDeclination * sinPhiMinusBeta;

            // Calculate denominator
            const denominator = cosPhi * cosSolarDeclination * cosOmega + sinPhi * sinSolarDeclination;

            // Division by almost-zero check
            const epsilon = 1e-10;
            if (Math.abs(denominator) < epsilon) {
                throw new Error('Denominator too close to zero');
            }

            // Calculate and return the quotient, Rb
            return numerator / denominator;
        } catch (error) {
            throw error;
        }
    },

    calculateTotalRadiationOnCollector: function(n, tilt, LST) {
        // Calculate extraterrestrial radiation (H0) and KT
        const H0 = this.calculateExtraterrestrialRadiation(n);
        const KT = this.calculateKT(n);

        // Calculate radiation at the Earth's surface (H)
        const H = this.calculateRadiationAtSurface(H0, KT);

        // Calculate Rb
        const Rb = this.calculateRb(n, tilt, LST);

        // Calculate direct/beam radiation on tilted surface (IbT)
        const directRadiationTilted = H * Rb;

        // Calculate diffuse radiation on tilted surface (IdT)
        const diffuseRadiationTilted = H * ((1 + Math.cos(this.degreesToRadians(tilt))) / 2);

        // Calculate reflected radiation on tilted surface (IrT)
        const reflectedRadiationTilted = 0.2 * diffuseRadiationTilted;

        // Calculate total radiation on collector (G)
        return directRadiationTilted + diffuseRadiationTilted + reflectedRadiationTilted;
    },

// simulateTemperatureChange: function(n, tilt, initialTemperature, timeStep) {
//     let T = initialTemperature;
//     let Tnew = initialTemperature;
//     const targetTemperature = 85;
//     let time = 0;
//
//     while (Tnew < targetTemperature) {
//         T = Tnew;
//         Tnew += timeStep * calculateQcoll(n, tilt, T, Tnew);
//         time += timeStep;
//     }
//
//     return { Qcoll: calculateQcoll(n, tilt, T, Tnew), finalTime: time };
// },


};

module.exports = model;