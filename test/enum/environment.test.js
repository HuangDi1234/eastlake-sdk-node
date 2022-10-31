const Environment = require("../../lib/enum/environment");

describe('test environment', () => {
    test('environment field',  function () {
        expect(Object.keys(Environment).length).toEqual(10);
        expect( Environment.hasOwnProperty('NOMAD_REGION')).toEqual(true);
        expect( Environment.hasOwnProperty('NOT_EXIST')).toEqual(false);
        expect( Environment.EVENT_OUTPUT_PATH.hasProperty()).toEqual(false);
        expect( Environment.NOMAD_DC.hasProperty()).toEqual(true);

        for (let key in Environment) {
            expect(key).toEqual(Environment[key].getName());
        }
    });

    test('environment exist',  function () {
        expect( Environment.NOMAD_DC.isExist()).toEqual(false);
        process.env[Environment.EVENT_OUTPUT_PATH.getName()] = ''
        expect( Environment.EVENT_OUTPUT_PATH.isExist()).toEqual(false);
        process.env[Environment.EVENT_OUTPUT_PATH.getName()] = 'aaa'
        expect( Environment.EVENT_OUTPUT_PATH.isExist()).toEqual(true);
        expect( Environment.EVENT_OUTPUT_PATH.getValue()).toEqual('aaa');
        delete process.env[Environment.EVENT_OUTPUT_PATH.getName()] ;
        expect( Environment.EVENT_OUTPUT_PATH.isExist()).toEqual(false);
    });
});
