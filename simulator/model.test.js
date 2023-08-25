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
        expect(calculatedKT).toBe(0.7);
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
        expect(model.calculateExtraterrestrialRadiation(1)).toBeCloseTo(1386.53, 2);

        const extraTerrestrialRadiation = model.calculateExtraterrestrialRadiation(100);
        const expectedResult = 1346.003;
        const precision = 1e-3;
        expect(extraTerrestrialRadiation).toBeLessThanOrEqual(expectedResult + precision)

        expect(model.calculateExtraterrestrialRadiation(365)).toBeCloseTo(1347.87, 2);
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
        expect(model.calculateExtraterrestrialRadiation(182)).toBeCloseTo(1319.056, 3);
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
        expect(model.calculateSolarDeclination(1)).toBeCloseTo(-23.011, 2);
        expect(model.calculateSolarDeclination(46)).toBeCloseTo(-13.289, 2);
        expect(model.calculateSolarDeclination(78)).toBeCloseTo(-1.210, 2);
        expect(model.calculateSolarDeclination(82)).toBeCloseTo(0.403, 2);
        expect(model.calculateSolarDeclination(112)).toBeCloseTo(11.928, 2);
        expect(model.calculateSolarDeclination(180)).toBeCloseTo(23.241, 2);
        expect(model.calculateSolarDeclination(250)).toBeCloseTo(5.400, 2);
        expect(model.calculateSolarDeclination(333)).toBeCloseTo(-21.825, 2);
        expect(model.calculateSolarDeclination(365)).toBeCloseTo(-23.085, 2);
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
        expect(model.calculateRb(90, 30)).toBeCloseTo(5.986, 2);
        // expect(model.calculateRb(180, 45)).toBeCloseTo(0.550, 2);
        // expect(model.calculateRb(270, 60)).toBeCloseTo(0.741, 2);
    });

    it('should throw an error for non-number input', () => {
        expect(() => model.calculateRb('150', 30)).toThrow();
        expect(() => model.calculateRb(180, '45')).toThrow();
    });

    it('should throw an error for out-of-range input', () => {
        expect(() => model.calculateRb(0, 30)).toThrowError('Input value must be an integer between 1 and 365');
        expect(() => model.calculateRb(400, 45)).toThrowError('Input value must be an integer between 1 and 365');
    });

    it('should throw an error for Infinity input', () => {
        expect(() => model.calculateRb(180, Infinity)).toThrowError();
    });
});