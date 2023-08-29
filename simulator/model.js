/* MVC Architecture */
/**
 * Model - Represents the application's data and logic (physics and math).
 * Handles data retrieval, storage, and processing.
 * Not directly concerned with user interface or presentation.
 */

const model = {

    /* Setting up slider values on window onload */
    onLoadFunction: function(){
        const sliderArray = [
            "collector-area", "collector-depth", "collector-tilt",
            "pipe-length", "storage-tank-volume", "temperature",
            "time-step"
        ];

        function toCamelCase(str) {
            return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
        }

        for (let i = 0; i < sliderArray.length; i++) {
            let slider = document.getElementById(sliderArray[i]);
            if (slider) {
                let camelCased = toCamelCase(sliderArray[i]);
                updateModelAndView(camelCased, slider.value);
            }
        }

        function updateModelAndView(camelCasedLabel, value) {
            if (typeof model['set' + capitalizeFirstLetter(camelCasedLabel)] === 'function') {
                model['set' + capitalizeFirstLetter(camelCasedLabel)](value);
            }

            if (typeof view['update' + capitalizeFirstLetter(camelCasedLabel) + 'Display'] === 'function') {
                view['update' + capitalizeFirstLetter(camelCasedLabel) + 'Display'](value);
            }
        }

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    },

    /* Setting default values */
    /* This sets up default values in case the user doesn't
     * make any selection from the dropdown menus or sliders */
    selectedValues: {
        month: { label: 'Month', value: 'January' },
        date: { label: 'Date', value: 1 },
        time: { label: 'Time', value: '1200' },
        collectorArea: { label: 'Collector Area', value: 280.0 },
        collectorDepth: { label: 'Collector Depth', value: 0.150 },
        collectorTilt: { label: 'Collector Tilt', value: 45.0 },
        pipeLength: { label: 'Pipe Length', value: 130.0 },
        storageTankVolume: { label: 'Storage Tank Volume', value: 1251.0 },
        temperature: { label: 'Starting Temperature', value: 47.5 },
        timeStep: { label: 'Time Step', value: 0.1 },
    },

    /* Arrays that contain the values of time and temperature */
    simulationData: {
        xArrayTime: [],
        yArrayTemp: []
    },

    /* Constants */
    specificHeatOfWater: 4200.0, // J/kg°C
    densityOfWater: 1.0, // kg/m^3
    averageSolarConstant: 1361, // W/m2
    latInRadians: 0.686280915, // latitude (of Utah) in radians
    pipeRadius: 0.05, // setting a 5cm radius for the pipe

    // F_R is the collector’s heat removal factor as a function of
    // tau, the transmittance of the cover
    // and alpha, the shortwave absorptivity of the absorber
    F_R_tau_alpha: 0.58,

    // U_L is the overall heat loss coefficient of the collector
    F_R_times_U_L: 0.7,

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

    /* Function to convert the month and date selections
     * to correspond to days of the year; 1 -365 */
    dayOfYear: function (month, date) {
        const daysBeforeMonth = {
            'January': 0,
            'February': 31,
            'March': 59,
            'April': 90,
            'May': 120,
            'June': 151,
            'July': 181,
            'August': 212,
            'September': 243,
            'October': 273,
            'November': 304,
            'December': 334,
        };

        let myDate = Number(date);

        // Check if the month and date are valid
        if (!daysBeforeMonth.hasOwnProperty(month) || myDate < 1
                                                   || myDate > 31) {
            throw new Error('Invalid month or date');
        }

        // Sum the days before the current month with the given date
        return daysBeforeMonth[month] + myDate;
    },

    /* Function to convert the time selection from a string
     * to a number */
    timeOfDay: function (time) {
        let timeAsNumber = -1;
        if (time === '0100'){
            timeAsNumber = Number(1);
        } else if(time === '0200'){
            timeAsNumber = Number(2);
        } else if(time === '0300'){
            timeAsNumber =Number(3);
        } else if(time === '0400'){
            timeAsNumber = Number(4);
        } else if(time === '0500'){
            timeAsNumber = Number(5);
        } else if(time === '0600'){
            timeAsNumber =Number(6);
        } else if(time === '0700'){
            timeAsNumber = Number(7);
        } else if(time === '0800'){
            timeAsNumber = Number(8);
        } else if(time === '0900'){
            timeAsNumber = Number(9);
        } else if(time === '1000') {
            timeAsNumber = Number(10);
        } else if(time === '1100'){
            timeAsNumber = Number(11);
        } else if(time === '1200'){
            timeAsNumber = Number(12);
        } else if(time === '1300'){
            timeAsNumber = Number(13);
        } else if(time === '1400'){
            timeAsNumber = Number(14);
        } else if(time === '1500'){
            timeAsNumber = Number(15);
        } else if(time === '1600'){
            timeAsNumber = Number(16);
        } else if(time === '1700'){
            timeAsNumber = Number(17);
        } else if(time === '1800'){
            timeAsNumber = Number(18);
        } else if(time === '1900'){
            timeAsNumber = Number(19);
        } else if(time === '2000'){
            timeAsNumber = Number(20);
        } else if(time === '2100'){
            timeAsNumber = Number(21);
        } else if(time === '2200'){
            timeAsNumber = Number(22);
        } else if(time === '2300'){
            timeAsNumber = Number(23);
        } else if(time === '2400'){
            timeAsNumber = Number(24);
        }
        console.log("Time as a number: ",timeAsNumber);
        return timeAsNumber;
    },

    /* Function that returns average temperature based
     * of the day of the year */
    temperatureForDay: function (dayOfYear) {
        if (dayOfYear >= 1 && dayOfYear <= 31) { // January
            return (4 - 3) / 2;
        } else if (dayOfYear > 31 && dayOfYear <= 59) { // February
            return (7 - 1) / 2;
        } else if (dayOfYear > 59 && dayOfYear <= 90) { // March
            return (13 + 3) / 2;
        } else if (dayOfYear > 90 && dayOfYear <= 120) { // April
            return (17 + 7) / 2;
        } else if (dayOfYear > 120 && dayOfYear <= 151) { // May
            return (22 + 11) / 2;
        } else if (dayOfYear > 151 && dayOfYear <= 181) { // June
            return (28 + 16) / 2;
        } else if (dayOfYear > 181 && dayOfYear <= 212) { // July
            return (32 + 20) / 2;
        } else if (dayOfYear > 212 && dayOfYear <= 243) { // August
            return (32 + 20) / 2;
        } else if (dayOfYear > 243 && dayOfYear <= 273) { // September
            return (26 + 14) / 2;
        } else if (dayOfYear > 273 && dayOfYear <= 304) { // October
            return (19 + 8) / 2;
        } else if (dayOfYear > 304 && dayOfYear <= 334) { // November
            return (10 + 2) / 2;
        } else if (dayOfYear > 334 && dayOfYear <= 365) { // December
            return (4 - 3) / 2;
        } else {
            return 0; // Invalid day number
        }
    },

    /* Function to compute the total volume of water in the solar heating system.
     * It is the combined volumes of the solar collector, the pipes, and the
     * storage tank. We are assuming a constant volume of water. */
    computeTotalVolume: function(){
        // Compute volume: storageTankVolume + π * r^2 * h of pipe + collector volume
        let pipeVolume = Number(Number(Math.PI) * Number(Math.pow(this.pipeRadius, 2)) * Number(this.selectedValues.pipeLength.value));
        //console.log("Pipe volume:", pipeVolume)
        let collectorVolume = Number(Number(this.selectedValues.collectorArea.value) * Number(this.selectedValues.collectorDepth.value));
        //console.log("Collector volume:", collectorVolume)

        // Adding all three to get the total volume
        return Number(Number(this.selectedValues.storageTankVolume.value) + Number(pipeVolume) + Number(collectorVolume))
    },


    /************************ Calculations ************************/

    /* Function for calculating the solar energy collected
     * on a solar collector per unit collector area per unit time
     *
     * Inputs: G, Global incident solar radiation on the collector (W/m^2)
     *         TAmbient, Temperature outside the collector (°C)
     *         TFluid, Temperature of the water inside the collector (°C)
     * Output: QColl, the energy collected per unit collector area
     *         per unit time (J/m^2s)
     *
     * This is the "main" formula to calculate how much solar
     * energy can be used to heat water - it accounts for some
     * heat loss */
    calculateEnergyCollected: function(G, TAmbient, TFluid) {
        let deltaT = TAmbient - TFluid;

        let term1 = this.F_R_tau_alpha * G;
        let term2 = this.F_R_times_U_L * deltaT;
        let QColl = Number(term1 - term2);

        console.log("QColl:", QColl)
        return QColl;
    },

    /* Function for computing the change in temperature of water
     * given the inputs of energy, starting / old temperature, and
     * volume of water being heated
     *
     * Inputs: E, energy required to heat water (J)
     *         TOld, Starting temperature of the water in the collector (°C)
     *         Volume, Total volume of the water being heated (m^3)
     * Output: TNew, New temperature of the water in the collector (°C)
     *
     * This is the other "main" formula which is used to calculate
     * how much the water's temperature increases in order to create
     * the simulation */
    computeNewTemperature: function (E, TOld, Volume){
        let TNew = TOld + (E /
                  (Volume * this.specificHeatOfWater * this.densityOfWater));
        console.log("T new:", TNew);
        return Number(TNew);
    },

    /************************ Supporting functions *******************/

    /* Function to convert angle in degrees to radians
     *
     * Input: angle in degrees (number)
     * Output: angle in radians (number) */
    degreesToRadians: function(degrees) {
        if (typeof degrees !== 'number') {
            throw new Error('Cannot convert string to radians');
        }

        if (degrees === Infinity) {
            throw new Error('Cannot divide by zero');
        }
        return Number(degrees * (Math.PI / 180.0));
    },

    /* Function to get the cosine of an angle when the angle's
     * sine is given
     *
     * Input: sine value of angle (number)
     * Output: cosine value of angle (number) */
    calculateCosineFromSine: function(sineValue){
        try {
            if (typeof sineValue !== 'number') {
                throw new Error('Input must be a number');
            }

            if (sineValue > 1 || sineValue < -1) {
                throw new Error('Input value must be between -1 and 1');
            }
            return Number(Math.sqrt(1.0 - Math.pow(sineValue, 2)));
        } catch (error) {
            throw error;
        }
    },

    /* Function to calculate the clearness index (KT) of a given day
     * in the year - it generally ranges from
     * 0.3 (low clearness, overcast skies) to 0.8 (high clearness, sunny sky)
     * It is an important factor when measuring how much solar radiation
     * is incident on the solar collector
     *
     * Input: n, day of the year (number between 1 and 365)
     * Output: KT, clearness index (floating point number between 0.3 and 0.8) */
    calculateClearnessIndex: function(dayOfYear) {
        try {
            if (typeof dayOfYear !== 'number') {
                throw new Error('Input must be a number');
            }

            if (dayOfYear <= 0 || dayOfYear > 365) {
                throw new Error('Input value must be between 1 and 365');
            }

            if (dayOfYear === Infinity) {
                throw new Error('Input value cannot be infinity');
            }

            if ((dayOfYear >= 349 && dayOfYear <= 365) || (dayOfYear >= 1 && dayOfYear <= 45)) {  // Mid Dec+1, Jan, mid Feb
                return 0.3;
            } else if (dayOfYear >= 46 && dayOfYear <= 105) {  // Mid-Feb+1 - Mid-April
                return 0.4;
            } else if (dayOfYear >= 106 && dayOfYear <= 135) {  // Mid-April+1 - Mid-May
                return 0.6;
            } else if (dayOfYear >= 136 && dayOfYear <= 166) {  // Mid-May+1 - June end
                return 0.8;
            } else if (dayOfYear >= 165 && dayOfYear <= 181) {  // Mid-May+1 - June end
                return 0.7;
            } else if (dayOfYear >= 182 && dayOfYear <= 212) {  // July full - Mid-Aug
                return 0.6;
            } else if (dayOfYear >= 213 && dayOfYear <= 243) {  // Mid-Aug+1 - Full Sept
                return 0.5;
            } else if (dayOfYear >= 244 && dayOfYear <= 348) {  // Late Sept through Mid-November
                return 0.4;
            }
        } catch (error) {
            throw error;
        }
    },

    /* Function to calculate the daily extraterrestrial radiation on
     * a horizontal surface. Extraterrestrial radiation is the solar
     * radiation outside the earth’s atmosphere.
     *
     * Input: n, day of the year (number between 1 and 365)
     * Output: H0, daily extraterrestrial radiation on
     *             a horizontal surface (number) */
    calculateExtraterrestrialRadiation: function(dayOfYear) {
        try {
            if (typeof dayOfYear !== 'number') {
                throw new Error('Input must be a number');
            }

            if (!Number.isInteger(dayOfYear) || dayOfYear <= 0 || dayOfYear > 365) {
                throw new Error('Input value must be an integer between 1 and 365');
            }

            if (dayOfYear === Infinity) {
                throw new Error('Input value cannot be infinity');
            }

            // returning value after converting expression inside cosine
            // function to be in radians
            return Number(this.averageSolarConstant *
                (1.0 + 0.034 *
                Math.cos((2.0 * Math.PI * dayOfYear) / 365.0)));
        } catch (error) {
            throw error;
        }
    },

    /* Function to calculate the monthly average daily solar radiation on
     * a horizontal surface.
     *
     * Input:  H0, daily extraterrestrial radiation on a horizontal surface
     *         (number)
     *         KT, clearness index of a given day in the year (number)
     * Output: H, monthly average daily solar radiation on a
     *            horizontal surface (number) */
    calculateRadiationAtSurface: function(extraterrestrialRadiation, clearnessIndex) {
        try {
            if (typeof extraterrestrialRadiation !== 'number' || typeof clearnessIndex !== 'number') {
                throw new Error('Input must be a number');
            }

            if (clearnessIndex < 0.3 || clearnessIndex > 0.8) {
                throw new Error('Input value must be a number between 0.3 and 0.8');
            }

            if (extraterrestrialRadiation === Infinity || clearnessIndex === Infinity) {
                throw new Error('Input value cannot be infinity');
            }

            return Number(extraterrestrialRadiation * clearnessIndex);
        } catch (error) {
            throw error;
        }
    },

    /* Formula to calculate solar declination
     * The declination is the angular position of the sun at solar noon,
     * with respect to the plane of the equator. Its value in degrees
     * is given by Cooper’s equation
     *
     * Input: n, day of the year (number between 1 and 365)
     * Output: delta, angular position of the sun (number in degrees) */
    calculateSolarDeclinationInDegrees: function(dayOfYear) {
        try {
            if (typeof dayOfYear !== 'number') {
                throw new Error('Input must be a number');
            }

            if (dayOfYear <= 0 || dayOfYear > 365) {
                throw new Error('Input value must be an integer between 1 and 365');
            }

            if (dayOfYear === Infinity) {
                throw new Error('Input value cannot be infinity');
            }
            let numerator = 284.0 + dayOfYear;
            const denominator = 365.0;
            let mixedFraction = numerator / denominator;
            let angle = 2.0 * Math.PI * mixedFraction;
            return Number(23.45 * Math.sin(angle));
        } catch (error) {
            throw error;
        }
    },

    /* Formula to calculate solar declination
     * The declination is the angular position of the sun at solar noon,
     * with respect to the plane of the equator. Its value in degrees
     * is given by Cooper’s equation
     *
     * Input: n, day of the year (number between 1 and 365)
     * Output: delta, angular position of the sun (number in radians) */
    calculateSolarDeclination: function(dayOfYear) {
        try {
            if (typeof dayOfYear !== 'number') {
                throw new Error('Input must be a number');
            }

            if (!Number.isInteger(dayOfYear) || dayOfYear <= 0 || dayOfYear > 365) {
                throw new Error('Input value must be an integer between 1 and 365');
            }

            if (dayOfYear === Infinity) {
                throw new Error('Input value cannot be infinity');
            }
            let numerator = 284.0 + dayOfYear;
            const denominator = 365.0;
            let mixedFraction = numerator / denominator;
            let angle = 2.0 * Math.PI * mixedFraction;
            // returning angle in degrees converted to radians
            return Number(this.degreesToRadians(23.45 * Math.sin(angle)));
        } catch (error) {
            throw error;
        }
    },

    /* Function to calculate the solar hour angle. The solar hour angle is
     * the angular displacement of the sun east or west of the local
     * meridian; morning negative, afternoon positive. It is an important
     * factor when measuring how much solar radiation is incident on the
     * solar collector
     *
     * Input: t, time of day (number between 1 and 24)
     * Output: omega, the solar hour angle in radians (number) */
    calculateOmegaFromTimeOfDay(timeOfDay) {
        /* We have made some assumptions here (*)
         * refer to the readme for more details */
        try {
            if (typeof timeOfDay !== 'number') {
                throw new Error('Input must be a number');
            }
            if (timeOfDay < 1 || timeOfDay > 24) {
                throw new Error('Input value must be a number between 1 and 24');
            }
            if (timeOfDay === Infinity) {
                throw new Error('Input value cannot be infinity');
            }
            return Number(this.degreesToRadians(15.0 * (Number(timeOfDay) - 12.0)));
        } catch (error) {
            throw error;
        }
    },

    /**/
    /* Function to calculate the sunset hour angle, omegaS. It is the solar
     * hour angle corresponding to the time when the sun sets. It useful
     * to know what the sunset hour angle is given a location's latitude
     * and solar declination. It can serve as a check to ensure that the
     * calculated solar hour angle (omega) is within a reasonable range
     *
     * Inputs: phi, the latitude of the site (number in radians)
     *         delta, angular position of the sun (number in radians)
     * Output: omegaS, sunset hour angle (number) */
    calculateOmegaS(latitudeInRadians, solarDeclinationInRadians) {
        let cosOmegaS = -Math.tan(latitudeInRadians) * Math.tan(solarDeclinationInRadians);
        return Number(Math.acos(cosOmegaS));
    },

    /* Function to calculate the ratio of direct (beam) radiation on a tilted
     * surface to that on a horizontal surface, which is called
     * the geometric factor (Rb)
     *
     * Inputs: n, day of the year (number between 1 and 365)
     *         beta, the slope/tilt of the solar collector (number)
     *         t, time of day (number between 1 and 24)
     * Output: Rb, the geometric factor */
    calculateGeometricFactor: function(dayOfYear, collectorTilt, timeOfDay) {
        try {
            if (typeof dayOfYear !== 'number' || typeof collectorTilt !== 'number' || typeof timeOfDay !== 'number') {
                throw new Error('Input must be a number');
            }
            if (dayOfYear <= 0 || dayOfYear > 365) {
                throw new Error('Input value must be an integer between 1 and 365');
            }
            if (collectorTilt < 0 || collectorTilt > 90) {
                throw new Error('Input value must be an integer between 0 and 90');
            }
            if (timeOfDay < 1 || timeOfDay > 24) {
                throw new Error('Input value must be an integer between 1 and 24');
            }
            if (dayOfYear === Infinity || collectorTilt === Infinity || timeOfDay === Infinity) {
                throw new Error('Input value cannot be infinity');
            }

            // Calculate solar declination (delta) -- in radians
            let solarDeclination = Number(this.calculateSolarDeclination(dayOfYear));
            // Get its sine and cosine
            let cosSolarDeclination = Math.cos(solarDeclination);
            let sinSolarDeclination = Math.sin(solarDeclination);

            // Calculate the solar hour angle -- in radians
            let omegaInRadians = Number(this.calculateOmegaFromTimeOfDay(timeOfDay));

            // Check that it makes sense, given the sunset hour angle (omegaS)
            let omegaS = Number(this.calculateOmegaS(this.latInRadians, solarDeclination));

            // If the sun is below the horizon...
            if (Math.abs(Number(omegaInRadians)) > omegaS) {
                return 0;  // ... we return 0
            }

            // Get the cosine of omega
            let cosOmega = Math.cos(Number(omegaInRadians));

            let phi = Number(this.degreesToRadians(collectorTilt));
            // Get its sine and cosine
            let cosPhi = Math.cos(phi);
            let sinPhi = Math.sin(phi);

            // Calculate artificial latitude calculated by subtracting
            // the collectorTilt from the latitude
            let phiMinusBeta = this.latInRadians - phi;
            // Get its sine and cosine
            let cosPhiMinusBeta = Math.cos(phiMinusBeta);
            let sinPhiMinusBeta = Math.sin(phiMinusBeta);

            /***** Finally, put it all together to get the ratio *****/

            // Calculate numerator
            let numerator = cosSolarDeclination * cosOmega * cosPhiMinusBeta + sinSolarDeclination * sinPhiMinusBeta;

            // Calculate denominator
            let denominator = cosPhi * cosSolarDeclination * cosOmega + sinPhi * sinSolarDeclination;

            // Division by almost-zero check
            const epsilon = 1e-10;
            if (Math.abs(denominator) < epsilon) {
                throw new Error('Denominator too close to zero');
            }

            // Calculate and return the quotient, the geometricFactor
            return Number(numerator / denominator);
        } catch (error) {
            throw error;
        }
    },

    /* Function to calculate G, the global incident solar radiation
     * on the collector.
     *
     * Inputs: n, day of the year (number between 1 and 365)
     *         beta, the slope/tilt of the solar collector (number)
     *         t, time of day (number between 1 and 24)
     * Output: G, the global incident solar radiation on the collector */
    calculateTotalRadiationOnCollector: function(dayOfYear, collectorTilt, timeOfDay) {
        // Calculate the extraterrestrial radiation (H0) and
        // the clearness index (KT)
        let H0 = Number(this.calculateExtraterrestrialRadiation(dayOfYear));
        let KT = this.calculateClearnessIndex(dayOfYear);

        // Calculate the radiation on the Earth's surface (H) using
        // the two values above
        let H = Number(this.calculateRadiationAtSurface(H0, KT));

        // Calculate the geometric factor, Rb
        let Rb = Number(this.calculateGeometricFactor(dayOfYear, collectorTilt, timeOfDay));

        // Calculate the direct/beam radiation on tilted surface (IbT)
        // using the geometric factor and radiation on the Earth's surface
        let directRadiationTilted = Number(H * Rb);

        // Calculate the diffuse radiation on a tilted surface (IdT)
        let diffuseRadiationTilted = H * ((1.0 + Math.cos(Number(this.degreesToRadians(collectorTilt)))) / 2.0);

        // Calculate the reflected radiation on tilted surface (IrT)
        let reflectedRadiationTilted = 0.2 * diffuseRadiationTilted;

        // Calculate the total radiation on the collector (G)
        // by adding the direct/beam radiation (IbT),
        // the diffuse radiation on a tilted surface (IdT),
        // and the reflected radiation on tilted surface (IrT)
        return Number(directRadiationTilted + diffuseRadiationTilted + reflectedRadiationTilted);
    }
};

/* If condition that allows using Node.js for testing and native
 * JavaScript for functioning in a web browser */

if (typeof module !== 'undefined' && module.exports) {
    module.exports = model;
}