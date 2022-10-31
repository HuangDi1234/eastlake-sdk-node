const Property = require("../../lib/enum/property");

describe('test property', () => {
    test('property', function () {
        expect(Object.keys(Property).length).toEqual(39);
        expect(Property.hasOwnProperty('TIME_MS')).toEqual(true);
        expect(Property.hasOwnProperty('NOT_EXIST')).toEqual(false);

        for (let key in Property) {
            expect(key).toEqual(Property[key].getName());
            expect(Property[key].getValue().includes(key.toLowerCase())).toBeTruthy()
        }
    });
})
