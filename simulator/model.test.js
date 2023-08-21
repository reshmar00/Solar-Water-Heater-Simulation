const model = require('./model');

describe('degreesToRadians', () => {
    test('converts 0 degrees to 0 radians', () => {
        expect(model.degreesToRadians(0)).toBeCloseTo(0, 10);
    });

    test('converts 90 degrees to pi/2 radians', () => {
        expect(model.degreesToRadians(90)).toBeCloseTo(Math.PI / 2, 10);
    });

    test('converts 180 degrees to pi radians', () => {
        expect(model.degreesToRadians(180)).toBeCloseTo(Math.PI, 10);
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