const model = require('./model');

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

describe('calculateKT', () => {
    test('calculates KT, when given n - expecting 0.3 for 355', () => {
        const n = 355;
        const calculatedKT = model.calculateKT(n);
        expect(calculatedKT).toBe(0.3);
    });

    test('calculates KT, when given n - expecting 0.3 for 33', () => {
        const n = 33;
        const calculatedKT = model.calculateKT(n);
        expect(calculatedKT).toBe(0.3);
    });

    test('calculates KT, when given n - expecting 0.4 for 47', () => {
        const n = 47;
        const calculatedKT = model.calculateKT(n);
        expect(calculatedKT).toBe(0.4);
    });

    test('calculates KT, when given n - expecting 0.7 for 199', () => {
        const n = 199;
        const calculatedKT = model.calculateKT(n);
        expect(calculatedKT).toBe(0.6);
    });

    test('edge case 1', () => {
        const n = 135;
        const calculatedKT = model.calculateKT(n);
        expect(calculatedKT).toBe(0.6);
    });

    test('edge case 2', () => {
        const n = 136;
        const calculatedKT = model.calculateKT(n);
        expect(calculatedKT).toBe(0.8);
    });

    test('negative number', () => {
        const n = -136;
        expect(() => model.calculateKT(n)).toThrow();
    });

    test('positive number outside range', () => {
        const n = 366;
        expect(() => model.calculateKT(n)).toThrow();
    });

    test('infinity', () => {
        const n = Infinity;
        expect(() => model.calculateKT(n)).toThrow();
    });

    test('string', () => {
        const n = '365';
        expect(() => model.calculateKT(n)).toThrow();
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

        // expect(model.calculateExtraterrestrialRadiation(182)).toBeCloseTo(1314.727, 3);
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

describe('calculateRb', () => {
    it('should calculate Rb correctly for valid input', () => {
        // Test cases for specific days of the year and tilt angles
        expect(model.calculateRb(1, 25, 9)).toBeCloseTo(1.2573, 3);
        expect(model.calculateRb(1, 30, 9)).toBeCloseTo(1.5723, 3);
        expect(model.calculateRb(19, 26, 10)).toBeCloseTo(1.2316, 3);
        expect(model.calculateRb(31, 27, 12)).toBeCloseTo(1.2188, 3);
        expect(model.calculateRb(32, 28, 12)).toBeCloseTo(1.2501, 3);
        expect(model.calculateRb(90, 30, 12)).toBeCloseTo(1.1107, 3);
        expect(model.calculateRb(100, 12, 13)).toBeCloseTo(0.945, 3);
        expect(model.calculateRb(111, 3.67, 14)).toBeCloseTo(0.938, 3);
        expect(model.calculateRb(125, 10, 11)).toBeCloseTo(0.9822, 3);
        expect(model.calculateRb(134, 15.5, 10)).toBeCloseTo(1.0038, 3);
        expect(model.calculateRb(180, 45, 9)).toBeCloseTo(0.8226, 3);
        expect(model.calculateRb(253, 34, 16)).toBeCloseTo(1.1073, 3);
        expect(model.calculateRb(363, 18.3456, 15)).toBeCloseTo(0.9450, 3);

        // Post sunset and pre sunrise, all values of Rb should be 0
        expect(model.calculateRb(158, 47.89, 23)).toBeCloseTo(0.000, 3);
        expect(model.calculateRb(173, 90, 22)).toBeCloseTo(0.000, 3);
        expect(model.calculateRb(181, 55.567, 21)).toBeCloseTo(0.000, 3);
        expect(model.calculateRb(272, 60.9876, 6)).toBeCloseTo(0.000, 3);
    });

    it('should throw an error for non-number input', () => {
        expect(() => model.calculateRb('150', 30)).toThrow();
        expect(() => model.calculateRb(180, '45')).toThrow();
    });

    it('should throw an error for out-of-range input', () => {
        expect(() => model.calculateRb(0, 30)).toThrowError('Input must be a number');
        expect(() => model.calculateRb(400, 45)).toThrowError('Input must be a number');
    });

    it('should throw an error for Infinity input', () => {
        expect(() => model.calculateRb(180, Infinity)).toThrowError();
    });
});

describe('calculateTotalRadiationOnCollector', () => {
    it('should calculate G correctly for valid input', () => {
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

        // For Rb values of 0...
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

describe('calculateQcoll', () => {
    it('should calculate Qcoll correctly for valid input', () => {
        // Test cases for specific days of the year and tilt angles
        expect(model.calculateQcoll(1, 25, 12, 25, 26)).toBeCloseTo(570.4104, 3);
        expect(model.calculateQcoll(1, 25, 12, 26, 27)).toBeCloseTo(570.4104, 3);
        expect(model.calculateQcoll(1, 25, 12, 27, 28)).toBeCloseTo(570.4104, 3);
        expect(model.calculateQcoll(1, 25, 12, 28.5, 28.6)).toBeCloseTo(571.0404, 3);
        expect(model.calculateQcoll(1, 25, 12, 28.6, 28.7)).toBeCloseTo(571.0404, 3);
        expect(model.calculateQcoll(1, 25, 12, 28.75, 28.76)).toBeCloseTo(571.1034, 3);

        expect(model.calculateQcoll(19, 26, 9, 45.56, 46.57)).toBeCloseTo(589.8770, 3);
        expect(model.calculateQcoll(19, 26, 9, 46.57, 46.78)).toBeCloseTo(590.4370, 3);
        expect(model.calculateQcoll(19, 26, 9, 75.57, 76.83)).toBeCloseTo(589.702, 3);
        expect(model.calculateQcoll(19, 26, 9, 76.84, 77.99)).toBeCloseTo(589.779, 3);
        expect(model.calculateQcoll(19, 26, 9, 84.59, 85.00)).toBeCloseTo(590.297, 3);

        expect(model.calculateQcoll(32, 28, 12, 66.99, 67.01)).toBeCloseTo(579.914, 3);
        expect(model.calculateQcoll(32, 28, 12, 67.99, 68.01)).toBeCloseTo(579.914, 3);
        expect(model.calculateQcoll(32, 28, 12, 68.45, 70.32)).toBeCloseTo(578.619, 3);
        expect(model.calculateQcoll(32, 28, 12, 75.35, 75.37)).toBeCloseTo(579.914, 3);
        expect(model.calculateQcoll(32, 28, 12, 82.34, 83,79)).toBeCloseTo(579.466, 3);

        expect(model.calculateQcoll(90, 30, 12, 5.00, 5.01)).toBeCloseTo(704.743, 3);
        expect(model.calculateQcoll(90, 30, 12, 5.01, 5.02)).toBeCloseTo(704.743, 3);
        expect(model.calculateQcoll(90, 30, 12, 5.03, 5.04)).toBeCloseTo(704.743, 3);
        expect(model.calculateQcoll(90, 30, 12, 5.04, 5.05)).toBeCloseTo(704.743, 3);
        expect(model.calculateQcoll(90, 30, 12, 5.05, 5.06)).toBeCloseTo(704.743, 3);

        expect(model.calculateQcoll(100, 12, 13, 37.54, 40.12)).toBeCloseTo(667.920, 3);
        expect(model.calculateQcoll(100, 12, 13, 41.00, 41.02)).toBeCloseTo(669.712, 3);
        expect(model.calculateQcoll(100, 12, 13, 45.71, 49.56)).toBeCloseTo(667.031, 3);
        expect(model.calculateQcoll(100, 12, 13, 54.66, 59.99)).toBeCloseTo(665.995, 3);
        expect(model.calculateQcoll(100, 12, 13, 67.77, 70.11)).toBeCloseTo(668.088, 3);

        expect(model.calculateQcoll(125, 10, 11, 25.01, 30.02)).toBeCloseTo(1006.542, 3);
        expect(model.calculateQcoll(125, 10, 11, 30.30, 40.00)).toBeCloseTo(1003.259, 3);
        expect(model.calculateQcoll(125, 10, 11, 40.50, 47.30)).toBeCloseTo(1005.289, 3);
        expect(model.calculateQcoll(125, 10, 11, 47.00, 50.20)).toBeCloseTo(1007.809, 3);
        expect(model.calculateQcoll(125, 10, 11, 50.10, 51.00)).toBeCloseTo(1009.419, 3);
        expect(model.calculateQcoll(125, 10, 11, 51.00, 59.60)).toBeCloseTo(1004.029, 3);
        expect(model.calculateQcoll(125, 10, 11, 59.00, 62.00)).toBeCloseTo(1007.949, 3);
        expect(model.calculateQcoll(125, 10, 11, 62.70, 67.00)).toBeCloseTo(1007.039, 3);
        expect(model.calculateQcoll(125, 10, 11, 67.00, 70.08)).toBeCloseTo(1007.893, 3);
        expect(model.calculateQcoll(125, 10, 11, 71.09, 81.02)).toBeCloseTo(1003.098, 3);
        expect(model.calculateQcoll(125, 10, 11, 81.03, 82.07)).toBeCloseTo(1009.321, 3);
        expect(model.calculateQcoll(125, 10, 11, 82.08, 83.02)).toBeCloseTo(1009.391, 3);
        expect(model.calculateQcoll(125, 10, 11, 83.05, 84.09)).toBeCloseTo(1009.321, 3);
        expect(model.calculateQcoll(125, 10, 11, 84.01, 85.00)).toBeCloseTo(1009.356, 3);


        // Warm days + noon - expecting larger Qcoll values
        expect(model.calculateQcoll(136, 45, 12, 84.01, 85.00)).toBeCloseTo(1253.8246, 3);
        expect(model.calculateQcoll(140, 45, 12, 84.01, 85.00)).toBeCloseTo(1242.5788, 3);
        expect(model.calculateQcoll(145, 45, 12, 84.01, 85.00)).toBeCloseTo(1230.2899, 3);
        expect(model.calculateQcoll(150, 45, 12, 84.01, 85.00)).toBeCloseTo(1219.9602, 3);
        expect(model.calculateQcoll(161, 45, 12, 84.01, 85.00)).toBeCloseTo(1204.1214, 3);
        expect(model.calculateQcoll(166, 45, 12, 84.01, 85.00)).toBeCloseTo(1200.0536, 3);


        // Cold days + evening - expecting smaller Qcoll values
        expect(model.calculateQcoll(277, 30, 18, 66.99, 67.01)).toBeCloseTo(354.1788, 3);
        expect(model.calculateQcoll(289, 30, 18, 66.99, 67.01)).toBeCloseTo(356.6260, 3);
        expect(model.calculateQcoll(301, 30, 18, 66.99, 67.01)).toBeCloseTo(358.9405, 3);
        expect(model.calculateQcoll(324, 30, 18, 66.99, 67.01)).toBeCloseTo(362.6550, 3);
        expect(model.calculateQcoll(355, 30, 18, 66.99, 67.01)).toBeCloseTo(274.0081, 3);
        expect(model.calculateQcoll(364, 30, 18, 66.99, 67.01)).toBeCloseTo(274.1400, 3);
        expect(model.calculateQcoll(365, 30, 18, 66.99, 67.01)).toBeCloseTo(274.1413, 3);

    });
});