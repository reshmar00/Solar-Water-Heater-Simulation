const model = require('./model');

// Testing if calculations result in reasonable values in model.js
describe('degreesToRadians', () => {
    test('converts 0 degrees to 0 radians', () => {
        expect(model.degreesToRadians(0)).toBe(0);
    });

    test('converts 90 degrees to around 1.5708 radians', () => {
        const radians = model.degreesToRadians(90);
        expect(radians).toBeLessThanOrEqual(1.5709); // Within 0.0001 of the expected value
        expect(radians).toBeGreaterThanOrEqual(1.5707);
    });

    test('converts 125.9 degrees to around 2.1973695 radians', () => {
        const radians = model.degreesToRadians(125.9);
        const expectedRadians = 2.1973695;
        const precision = 1e-7;

        expect(radians).toBeLessThanOrEqual(expectedRadians + precision);
        expect(radians).toBeGreaterThanOrEqual(expectedRadians - precision);
    });

    test('converts 126.1 degrees to around 2.2008602 radians', () => {
        const radians = model.degreesToRadians(126.1);
        const expectedRadians = 2.2008602;
        const precision = 1e-7;
        expect(radians).toBeLessThanOrEqual(expectedRadians + precision)
        expect(radians).toBeGreaterThanOrEqual(expectedRadians - precision);
    });

    test('converts 180 degrees to pi (3.14159) radians', () => {
        const radians = model.degreesToRadians(180);
        expect(radians).toBeLessThanOrEqual(3.14160); // Within 0.0001 of the expected value
        expect(radians).toBeGreaterThanOrEqual(3.14158);
    });

    test('converts 199.9 degrees to around 3.4889132 radians', () => {
        const radians = model.degreesToRadians(199.9);
        const expectedRadians = 3.4889132;
        const precision = 1e-7;
        expect(radians).toBeLessThanOrEqual(expectedRadians + precision)
        expect(radians).toBeGreaterThanOrEqual(expectedRadians - precision);
    });

    test('converts 200.01 degrees to around 3.49083304 radians', () => {
        const radians = model.degreesToRadians(200.01);
        const expectedRadians = 3.49083304;
        const precision = 1e-8;
        expect(radians).toBeLessThanOrEqual(expectedRadians + precision)
        expect(radians).toBeGreaterThanOrEqual(expectedRadians - precision);
    });

    test('converts 201.5 degrees to around 3.5168384 radians', () => {
        const radians = model.degreesToRadians(201.5);
        const expectedRadians = 3.5168384;
        const precision = 1e-7;
        expect(radians).toBeLessThanOrEqual(expectedRadians + precision)
        expect(radians).toBeGreaterThanOrEqual(expectedRadians - precision);
    });

    test('converts 255.62879 degrees to around 4.46156404837 radians', () => {
        const radians = model.degreesToRadians(255.62879);
        const expectedRadians = 4.46156404838;
        const precision = 1e-11;
        expect(radians).toBeLessThanOrEqual(expectedRadians + precision)
        expect(radians).toBeGreaterThanOrEqual(expectedRadians - precision);
    });

    test('converts 270 degrees to 3pi/2 radians', () => {
        expect(model.degreesToRadians(270)).toBeCloseTo((3 * Math.PI) / 2, 10);
    });

    test('converts 360 degrees to 2pi radians', () => {
        expect(model.degreesToRadians(360)).toBeCloseTo(2 * Math.PI, 10);
    });

    test('converts negative degrees correctly', () => {
        expect(model.degreesToRadians(-45)).toBeCloseTo(-Math.PI / 4, 10);
    });

    test('handles bad input (NaN) correctly', () => {
        expect(() => model.degreesToRadians('abc')).toThrow('Cannot convert string to radians');
    });

    test('handles division by zero', () => {
        expect(() => model.degreesToRadians(Infinity)).toThrow('Cannot divide by zero');
    });
});

describe('calculateCosineFromSine', () => {
    test('calculates cosine for a valid sine value', () => {
        const sineValue = Math.sqrt(3) / 2; // Sine value for 60 degrees
        const expectedCosine = 0.5; // Cosine value for 60 degrees
        const calculatedCosine = model.calculateCosineFromSine(sineValue);
        expect(calculatedCosine).toBeCloseTo(expectedCosine, 10);
    });

    test('calculates cosine for sine value 0', () => {
        const sineValue = 0;
        const expectedCosine = 1;
        const calculatedCosine = model.calculateCosineFromSine(sineValue);
        expect(calculatedCosine).toBeCloseTo(expectedCosine, 10);
    });

    test('calculates cosine for sine value 1', () => {
        const sineValue = 1;
        const expectedCosine = 0;
        const calculatedCosine = model.calculateCosineFromSine(sineValue);
        expect(calculatedCosine).toBeCloseTo(expectedCosine, 10);
    });

    test('calculates cosine for negative sine value', () => {
        const sineValue = -0.5; // Sine value for -30 degrees
        const expectedCosine = Math.sqrt(3) / 2; // Cosine value for -30 degrees
        const calculatedCosine = model.calculateCosineFromSine(sineValue);
        expect(calculatedCosine).toBeCloseTo(expectedCosine, 10);
    });

    test('throws an error for input greater than 1', () => {
        const invalidSineValue = 1.5;
        expect(() => model.calculateCosineFromSine(invalidSineValue)).toThrow();
    });

    test('throws an error for input less than -1', () => {
        const invalidSineValue = -1.2;
        expect(() => model.calculateCosineFromSine(invalidSineValue)).toThrow();
    });

    test('throws an error for non-numeric input', () => {
        const nonNumericSineValue = 'abc';
        expect(() => model.calculateCosineFromSine(nonNumericSineValue)).toThrow();
    });
});

describe('calculateClearnessIndex, KT', () => {
    test('calculates the clearness index (KT), ' +
         'when given the day of the year; expecting 0.3 for 355', () => {
        const dayOfYear = 355;
        const calculatedKT = model.calculateClearnessIndex(dayOfYear);
        expect(calculatedKT).toBe(0.3);
    });

    test('calculates the clearness index (KT), ' +
         'when given the day of the year; expecting 0.3 for 33', () => {
        const dayOfYear = 33;
        const calculatedKT = model.calculateClearnessIndex(dayOfYear);
        expect(calculatedKT).toBe(0.3);
    });

    test('calculates the clearness index (KT), ' +
        'when given the day of the year; expecting 0.4 for 47', () => {
        const dayOfYear = 47;
        const calculatedKT = model.calculateClearnessIndex(dayOfYear);
        expect(calculatedKT).toBe(0.4);
    });

    test('calculates the clearness index (KT), ' +
        'when given the day of the year; expecting 0.6 for 199', () => {
        const dayOfYear = 199;
        const calculatedKT = model.calculateClearnessIndex(dayOfYear);
        expect(calculatedKT).toBe(0.6);
    });

    test('edge case 1', () => {
        const dayOfYear = 135;
        const calculatedKT = model.calculateClearnessIndex(dayOfYear);
        expect(calculatedKT).toBe(0.6);
    });

    test('edge case 2', () => {
        const dayOfYear = 136;
        const calculatedKT = model.calculateClearnessIndex(dayOfYear);
        expect(calculatedKT).toBe(0.8);
    });

    test('negative number', () => {
        const dayOfYear = -136;
        expect(() => model.calculateClearnessIndex(dayOfYear)).toThrow();
    });

    test('positive number outside range', () => {
        const dayOfYear = 366;
        expect(() => model.calculateClearnessIndex(dayOfYear)).toThrow();
    });

    test('infinity', () => {
        const dayOfYear = Infinity;
        expect(() => model.calculateClearnessIndex(dayOfYear)).toThrow();
    });

    test('string', () => {
        const dayOfYear = '365';
        expect(() => model.calculateClearnessIndex(dayOfYear)).toThrow();
    });
});

describe('calculateExtraterrestrialRadiation', () => {
    test('should calculate radiation for a valid day of the year', () => {
        const extraTerrestrialRadiationOnDay1 = model.calculateExtraterrestrialRadiation(1);
        const expectedResultForDay1 = 1407.26;
        const precisionOf2 = 1e-2;
        expect(extraTerrestrialRadiationOnDay1).toBeLessThanOrEqual(expectedResultForDay1 + precisionOf2)

        const extraTerrestrialRadiationOnDay100 = model.calculateExtraterrestrialRadiation(100);
        const expectedResultForDay100 = 1354.056;
        const precisionOf3 = 1e-3;
        expect(extraTerrestrialRadiationOnDay100).toBeLessThanOrEqual(expectedResultForDay100 + precisionOf3)

        const extraTerrestrialRadiationOnDay180 = model.calculateExtraterrestrialRadiation(180);
        const expectedResultForDay180 = 1314.7688;
        expect(extraTerrestrialRadiationOnDay180).toBeCloseTo(expectedResultForDay180 + precisionOf3)

        const extraTerrestrialRadiationOnDay365 = model.calculateExtraterrestrialRadiation(365);
        const expectedResultForDay365 = 1407.274;
        expect(extraTerrestrialRadiationOnDay365).toBeLessThanOrEqual(expectedResultForDay365 + precisionOf3)
    });

    test('should throw an error for Infinity', () => {
        expect(() => model.calculateExtraterrestrialRadiation(Infinity)).toThrow()
    });

    test('should throw an error for 0', () => {
        expect(() => model.calculateExtraterrestrialRadiation(0)).toThrow()
    });

    test('should throw an error for a negative number', () => {
        expect(() => model.calculateExtraterrestrialRadiation(-50)).toThrow()
    });

    test('should throw an error for string input', () => {
        expect(() => model.calculateExtraterrestrialRadiation('hello')).toThrow();
    });

    test('should throw an error for floating point number input', () => {
        expect(() => model.calculateExtraterrestrialRadiation(1.5)).toThrow();
        expect(() => model.calculateExtraterrestrialRadiation(364.5)).toThrow();
    });
    test('should calculate radiation for edge cases', () => {
        const extraTerrestrialRadiationOnDay182 = model.calculateExtraterrestrialRadiation(182);
        const expectedResultForDay182 = 1314.727;
        const precisionOf3 = 1e-3;
        expect(extraTerrestrialRadiationOnDay182).toBeLessThanOrEqual(expectedResultForDay182 + precisionOf3)

    });
});

describe('calculateRadiationAtSurface', () => {
    it('should calculate radiation correctly for valid input', () => {
        expect(model.calculateRadiationAtSurface(1000, 0.5)).toBe(500);
        expect(model.calculateRadiationAtSurface(1500, 0.7)).toBe(1050);
        expect(model.calculateRadiationAtSurface(800, 0.3)).toBe(240);
    });

    it('should throw an error for non-number input', () => {
        expect(() => model.calculateRadiationAtSurface('1000', 0.5)).toThrowError();
        expect(() => model.calculateRadiationAtSurface(1000, '0.5')).toThrowError();
        expect(() => model.calculateRadiationAtSurface('1000', '0.5')).toThrowError();
    });

    it('should throw an error for Infinity input', () => {
        expect(() => model.calculateRadiationAtSurface(Infinity, 0.5)).toThrowError();
        expect(() => model.calculateRadiationAtSurface(1000, Infinity)).toThrowError();
        expect(() => model.calculateRadiationAtSurface(Infinity, Infinity)).toThrowError();
    });
});

describe('calculateSolarDeclination', () => {
    it('should calculate solar declination correctly for valid input', () => {
        // Test cases for specific days of the year
        expect(model.calculateSolarDeclination(1)).toBeCloseTo(-0.401, 2);
        expect(model.calculateSolarDeclination(46)).toBeCloseTo(-0.231, 2);
        expect(model.calculateSolarDeclination(78)).toBeCloseTo(-0.021, 2);
        expect(model.calculateSolarDeclination(82)).toBeCloseTo(0.0070, 3);
        expect(model.calculateSolarDeclination(90)).toBeCloseTo(0.063, 2);
        expect(model.calculateSolarDeclination(112)).toBeCloseTo(0.208, 2);
        expect(model.calculateSolarDeclination(180)).toBeCloseTo(0.405, 2);
        expect(model.calculateSolarDeclination(250)).toBeCloseTo(0.0942, 3);
        expect(model.calculateSolarDeclination(333)).toBeCloseTo(-0.380, 2);
        expect(model.calculateSolarDeclination(365)).toBeCloseTo(-0.402, 2);

        // Without degreesToRadians conversion -- test cases verified in Pg 29 of
        // Simulation of Solar Radiation Incident on Horizontal and
        // Inclined Surfaces by MA Basunia, H Yoshio, and T Abe
        expect(model.calculateSolarDeclinationInDegrees(17)).toBeCloseTo(-20.916, 2);
        expect(model.calculateSolarDeclinationInDegrees(47)).toBeCloseTo(-12.954, 2);
        expect(model.calculateSolarDeclinationInDegrees(75)).toBeCloseTo(-2.417, 2);
        expect(model.calculateSolarDeclinationInDegrees(105)).toBeCloseTo(9.414, 2);
        expect(model.calculateSolarDeclinationInDegrees(135)).toBeCloseTo(18.791, 2);
        expect(model.calculateSolarDeclinationInDegrees(162)).toBeCloseTo(23.085, 2);
        expect(model.calculateSolarDeclinationInDegrees(198)).toBeCloseTo(21.183, 2);
        expect(model.calculateSolarDeclinationInDegrees(228)).toBeCloseTo(13.454, 2);
        expect(model.calculateSolarDeclinationInDegrees(258)).toBeCloseTo(2.216, 2);
        expect(model.calculateSolarDeclinationInDegrees(288)).toBeCloseTo(-9.600, 2);
        expect(model.calculateSolarDeclinationInDegrees(318)).toBeCloseTo(-18.911, 2);
        expect(model.calculateSolarDeclinationInDegrees(344)).toBeCloseTo(-23.049, 2);
    });

    it('should throw an error for non-number input', () => {
        expect(() => model.calculateSolarDeclination('150')).toThrowError('Input must be a number');
    });

    it('should throw an error for out-of-range input', () => {
        expect(() => model.calculateSolarDeclination(0)).toThrowError('Input value must be an integer between 1 and 365');
        expect(() => model.calculateSolarDeclination(400)).toThrowError('Input value must be an integer between 1 and 365');
    });

    it('should throw an error for Infinity input', () => {
        expect(() => model.calculateSolarDeclination(Infinity)).toThrowError('Input value must be an integer between 1 and 365');
    });
});

describe('calculateOmegaFromTimeOfDay', () => {
    it('should calculate the solar hour angle in radians correctly for valid input', () => {
        // Test cases for specific times of the day
        // The solar hour angle varies from -180° to 180° in degrees,
        // which is -π to π in radians. It is 0 at noon and is negative
        // before noon and positive after.
        expect(model.calculateOmegaFromTimeOfDay(1)).toBeCloseTo(-2.879, 2);
        expect(model.calculateOmegaFromTimeOfDay(2)).toBeCloseTo(-2.617, 2);
        expect(model.calculateOmegaFromTimeOfDay(3)).toBeCloseTo(-2.356, 2);
        expect(model.calculateOmegaFromTimeOfDay(4)).toBeCloseTo(-2.094, 2);
        expect(model.calculateOmegaFromTimeOfDay(5)).toBeCloseTo(-1.832, 2);
        expect(model.calculateOmegaFromTimeOfDay(6)).toBeCloseTo(-1.570, 2);
        expect(model.calculateOmegaFromTimeOfDay(7)).toBeCloseTo(-1.308, 2);
        expect(model.calculateOmegaFromTimeOfDay(8)).toBeCloseTo(-1.047, 2);
        expect(model.calculateOmegaFromTimeOfDay(9)).toBeCloseTo(-0.785, 2);
        expect(model.calculateOmegaFromTimeOfDay(10)).toBeCloseTo(-0.523, 2);
        expect(model.calculateOmegaFromTimeOfDay(11)).toBeCloseTo(-0.261, 2);
        expect(model.calculateOmegaFromTimeOfDay(12)).toBeCloseTo(0.000, 2);
        expect(model.calculateOmegaFromTimeOfDay(13)).toBeCloseTo(0.261, 2);
        expect(model.calculateOmegaFromTimeOfDay(14)).toBeCloseTo(0.523, 2);
        expect(model.calculateOmegaFromTimeOfDay(15)).toBeCloseTo(0.785, 2);
        expect(model.calculateOmegaFromTimeOfDay(16)).toBeCloseTo(1.047, 2);
        expect(model.calculateOmegaFromTimeOfDay(17)).toBeCloseTo(1.308, 2);
        expect(model.calculateOmegaFromTimeOfDay(18)).toBeCloseTo(1.570, 2);
        expect(model.calculateOmegaFromTimeOfDay(19)).toBeCloseTo(1.832, 2);
        expect(model.calculateOmegaFromTimeOfDay(20)).toBeCloseTo(2.094, 2);
        expect(model.calculateOmegaFromTimeOfDay(21)).toBeCloseTo(2.356, 2);
        expect(model.calculateOmegaFromTimeOfDay(22)).toBeCloseTo(2.617, 2);
        expect(model.calculateOmegaFromTimeOfDay(23)).toBeCloseTo(2.879, 2);
        expect(model.calculateOmegaFromTimeOfDay(24)).toBeCloseTo(3.141, 2);
    });
});

describe('calculateTotalRadiationOnCollector', () => {
    it('should correctly calculate G, the total global incident solar radiation ' +
        'on the collector for valid input', () => {
        // Test cases for specific days of the year and tilt angles
        expect(model.calculateTotalRadiationOnCollector(1, 25, 9)).toBeCloseTo(1013.6951, 3);
        expect(model.calculateTotalRadiationOnCollector(1, 30, 9)).toBeCloseTo(1136.5127, 3);
        expect(model.calculateTotalRadiationOnCollector(19, 26, 9)).toBeCloseTo(1018.2484, 3);
        expect(model.calculateTotalRadiationOnCollector(31, 27, 12)).toBeCloseTo(989.0418, 3);
        expect(model.calculateTotalRadiationOnCollector(32, 28, 12)).toBeCloseTo(999.8758, 3);
        expect(model.calculateTotalRadiationOnCollector(90, 30, 12)).toBeCloseTo(1215.0867, 3);
        expect(model.calculateTotalRadiationOnCollector(100, 12, 13)).toBeCloseTo(1154.7005, 3);
        expect(model.calculateTotalRadiationOnCollector(111, 3.67, 14)).toBeCloseTo(1725.2573, 3);
        expect(model.calculateTotalRadiationOnCollector(125, 10, 11)).toBeCloseTo(1741.4644, 3);
        expect(model.calculateTotalRadiationOnCollector(134, 15.5, 10)).toBeCloseTo(1741.1860, 3);
        expect(model.calculateTotalRadiationOnCollector(180, 45, 9)).toBeCloseTo(1699.7809, 3);
        expect(model.calculateTotalRadiationOnCollector(253, 34, 16)).toBeCloseTo(1186.0349, 3);
        expect(model.calculateTotalRadiationOnCollector(363, 18.3456, 15)).toBeCloseTo(892.7166, 3);
        expect(model.calculateTotalRadiationOnCollector(365, 90, 17)).toBeCloseTo(253.3093, 3);
        expect(model.calculateTotalRadiationOnCollector(365, 45, 18)).toBeCloseTo(432.4260, 3);
        expect(model.calculateTotalRadiationOnCollector(365, 30, 19)).toBeCloseTo(472.6816, 3);

        // For geometric factor (Rb) values of 0...
        expect(model.calculateTotalRadiationOnCollector(158, 47.89, 23)).toBeCloseTo(1057.4866, 3);
        expect(model.calculateTotalRadiationOnCollector(173, 90, 22)).toBeCloseTo(552.4442, 3);
        expect(model.calculateTotalRadiationOnCollector(181, 55.567, 21)).toBeCloseTo(864.4236, 3);
        expect(model.calculateTotalRadiationOnCollector(272, 60.9876, 6)).toBeCloseTo(484.5632, 3);
    });

    it('should throw error if input is not a number', () => {
        expect(() => {
            model.calculateTotalRadiationOnCollector('string', 45, 12);
        }).toThrow();
    });

    it('should throw error if n is not between 1 and 365', () => {
        expect(() => {
            model.calculateTotalRadiationOnCollector(366, 45, 12);
        }).toThrow();

        expect(() => {
            model.calculateTotalRadiationOnCollector(0, 45, 12);
        }).toThrow();
    });

    it('should throw error if tilt is not between 0 and 90', () => {
        expect(() => {
            model.calculateTotalRadiationOnCollector(100, 91, 12);
        }).toThrow();

        expect(() => {
            model.calculateTotalRadiationOnCollector(100, -1, 12);
        }).toThrow();
    });

    it('should throw error if inputs are Infinity', () => {
        expect(() => {
            model.calculateTotalRadiationOnCollector(Infinity, 45, 12);
        }).toThrow();
    });

    it('should throw error if time is not inside 24 hr clock', () => {
        expect(() => {
            model.calculateTotalRadiationOnCollector(60, 45, 25);
        }).toThrow();
    });
});

describe('calculateGeometricFactor', () => {

    it('should calculate the geometric factor, Rb, correctly for valid input', () => {
        // Test cases for specific days of the year, tilt angles, and times of day.
        expect(model.calculateGeometricFactor(1, 25, 9)).toBeCloseTo(1.2573, 3);
        expect(model.calculateGeometricFactor(1, 30, 9)).toBeCloseTo(1.5723, 3);
        expect(model.calculateGeometricFactor(19, 26, 10)).toBeCloseTo(1.2316, 3);
    });

    it('should return 0 for times after sunset and before sunrise', () => {
        expect(model.calculateGeometricFactor(158, 47.89, 23)).toBeCloseTo(0.000, 3);
        expect(model.calculateGeometricFactor(173, 90, 22)).toBeCloseTo(0.000, 3);
    });

    it('should throw an error for invalid input types', () => {
        expect(() => model.calculateGeometricFactor('a', 25, 9)).toThrow();
        expect(() => model.calculateGeometricFactor(1, 'b', 9)).toThrow();
        expect(() => model.calculateGeometricFactor(1, 25, 'c')).toThrow();
    });

    it('should throw an error for out-of-range values', () => {
        expect(() => model.calculateGeometricFactor(0, 25, 9)).toThrow();
        expect(() => model.calculateGeometricFactor(366, 25, 9)).toThrow();
        expect(() => model.calculateGeometricFactor(1, -1, 9)).toThrow();
        expect(() => model.calculateGeometricFactor(1, 91, 9)).toThrow();
        expect(() => model.calculateGeometricFactor(1, 25, 0)).toThrow();
        expect(() => model.calculateGeometricFactor(1, 25, 25)).toThrow();
    });

    it('should handle Infinity values', () => {
        expect(() => model.calculateGeometricFactor(Infinity, 25, 9)).toThrow();
        expect(() => model.calculateGeometricFactor(1, Infinity, 9)).toThrow();
        expect(() => model.calculateGeometricFactor(1, 25, Infinity)).toThrow();
    });

});

describe('calculateTotalRadiationOnCollector', () => {

    it('should calculate total radiation on the collector correctly for valid input', () => {
        // Test cases for specific days of the year, tilt angles, and times of day.
        expect(model.calculateTotalRadiationOnCollector(1, 25, 9)).toBeCloseTo(1013.6951, 3);
        expect(model.calculateTotalRadiationOnCollector(50, 45, 12)).toBeCloseTo(1583.6613, 3);
        expect(model.calculateTotalRadiationOnCollector(100, 10, 14)).toBeCloseTo(1152.0072, 3);
        expect(model.calculateTotalRadiationOnCollector(284, 37, 11)).toBeCloseTo(1357.2061, 3);
        expect(model.calculateTotalRadiationOnCollector(212, 45, 12)).toBeCloseTo(1623.6593, 3);
    });

    it('should return a lower value for times after sunset and before sunrise', () => {
        expect(model.calculateTotalRadiationOnCollector(59, 45, 5)).toBeCloseTo(567.60202, 3);
        expect(model.calculateTotalRadiationOnCollector(18, 30, 4)).toBeCloseTo(471.9414, 3);
        expect(model.calculateTotalRadiationOnCollector(158, 47.89, 23)).toBeCloseTo(1057.4866, 3);
        expect(model.calculateTotalRadiationOnCollector(173, 90, 22)).toBeCloseTo(552.4442, 3);
    });

    it('should throw an error for invalid input types', () => {
        expect(() => model.calculateTotalRadiationOnCollector('a', 25, 9)).toThrow();
        expect(() => model.calculateTotalRadiationOnCollector(1, 'b', 9)).toThrow();
        expect(() => model.calculateTotalRadiationOnCollector(1, 25, 'c')).toThrow();
    });

    it('should throw an error for out-of-range values', () => {
        expect(() => model.calculateTotalRadiationOnCollector(0, 25, 9)).toThrow();
        expect(() => model.calculateTotalRadiationOnCollector(366, 25, 9)).toThrow();
        expect(() => model.calculateTotalRadiationOnCollector(1, -1, 9)).toThrow();
        expect(() => model.calculateTotalRadiationOnCollector(1, 91, 9)).toThrow();
        expect(() => model.calculateTotalRadiationOnCollector(1, 25, 0)).toThrow();
        expect(() => model.calculateTotalRadiationOnCollector(1, 25, 25)).toThrow();
    });

    it('should handle Infinity values', () => {
        expect(() => model.calculateTotalRadiationOnCollector(Infinity, 25, 9)).toThrow();
        expect(() => model.calculateTotalRadiationOnCollector(1, Infinity, 9)).toThrow();
        expect(() => model.calculateTotalRadiationOnCollector(1, 25, Infinity)).toThrow();
    });

});


describe('calculateEnergyCollected, QColl', () => {
    it('should correctly calculate  the energy collected per unit collector ' +
        'area per unit time (QColl) for valid input', () => {
        // Test cases for specific days of the year and tilt angles

        // Input G is from before sunrise and after sunset, expecting smaller QColl values
        expect(model.calculateEnergyCollected(471.9414, 84.01, 85.00)).toBeCloseTo(274.419, 3);
        expect(model.calculateEnergyCollected(471.9414, 84.02, 84.00)).toBeCloseTo(273.712, 3);
        expect(model.calculateEnergyCollected(471.9414, 84.09, 85.00)).toBeCloseTo(274.363, 3);
        expect(model.calculateEnergyCollected(471.9414, 84.99, 85.00)).toBeCloseTo(273.733, 3);
        expect(model.calculateEnergyCollected(471.9414, 83.25, 85.00)).toBeCloseTo(274.951, 3);
        expect(model.calculateEnergyCollected(471.9414, 81.03, 85.00)).toBeCloseTo(276.505, 3);

        // Input G is from a warm day at noon, expecting larger QColl values
        expect(model.calculateEnergyCollected(1623.6593, 66.99, 67.01)).toBeCloseTo(941.7363, 3);
        expect(model.calculateEnergyCollected(1623.6593, 66.99, 68.01)).toBeCloseTo(942.436, 3);
        expect(model.calculateEnergyCollected(1623.6593, 25.57, 25.03)).toBeCloseTo(941.344, 3);
        expect(model.calculateEnergyCollected(1623.6593, 67.89, 67.90)).toBeCloseTo(941.729, 3);
        expect(model.calculateEnergyCollected(1623.6593, 67.90, 67.91)).toBeCloseTo(941.729, 3);
        expect(model.calculateEnergyCollected(1623.6593, 66.92, 67.93)).toBeCloseTo(942.429, 3);
        expect(model.calculateEnergyCollected(1623.6593, 66.94, 67.95)).toBeCloseTo(942.429, 3);

    });
});
describe('computeNewTemperature', () => {

    it('should compute new temperature correctly for valid input', () => {
        // Test cases for specific energy, old temperatures, and volumes.
        expect(model.computeNewTemperature(0, 15.33, 59)).toBeCloseTo(15.330, 3);
        expect(model.computeNewTemperature(12, 20.21, 150)).toBeCloseTo(20.210, 3);
        expect(model.computeNewTemperature(59, 20.12, 302)).toBeCloseTo(20.120, 3);
        expect(model.computeNewTemperature(274.951, 75.80, 25)).toBeCloseTo(75.8000, 3);

        // For large volumes, the temperature change is very small
        expect(model.computeNewTemperature(942.429, 68.79, 2500)).toBeCloseTo(68.7900, 3);
        expect(model.computeNewTemperature(523.679, 83.25, 1251)).toBeCloseTo(83.2500, 3);
    });
});

