const util = require('../../lib/util/util')

describe('test util', () => {
    test('each', function () {
        let test = {
            'test-int': 1,
            'test-str': 'aaa',
        }
        let count = 0;
        util.each(test, function (v, k) {
            if (k === 'test-int') {
                count++
            }
            if (k === 'test-str') {
                count++
            }
        })
        expect(count).toEqual(2)

    });

    test('extend', function () {
        let test1 = {
            'test-int-1': 1,
            'test-str': 'aaa1',
        }
        let test2 = {
            'test-int-2': 2,
            'test-str': 'aaa2',
        }
        let test3 = {
            'test-int-3': 3,
            'test-str': undefined,
        }
        util.extend(test1, test2, test3);
        expect(test1['test-str']).toEqual('aaa2');
        expect(test1['test-int-1']).toEqual(1);
        expect(test1['test-int-2']).toEqual(2);
        expect(test1['test-int-3']).toEqual(3);
    });

    test('check ', function () {
        expect(util.check.isNumber(1)).toEqual(true);
        expect(util.check.isNumber('1')).toEqual(false);

        let test1 = {
            'test-int': 1,
            'test-undefined': undefined
        }
        expect(util.check.isUndefined(test1["test-undefined"])).toEqual(true);
        expect(util.check.isUndefined(test1["test-int"])).toEqual(false);

        expect(util.check.isObject(test1)).toEqual(true);
        expect(util.check.isObject(test1["test-int"])).toEqual(false);

        expect(util.check.isEmptyObject(test1)).toEqual(false);
        expect(util.check.isEmptyObject({})).toEqual(true);

        expect(util.check.isArray([])).toEqual(true);
        expect(util.check.isArray(test1)).toEqual(false);

        expect(util.check.isString('1')).toEqual(true);
        expect(util.check.isString(test1)).toEqual(false);

        expect(util.check.isDate(new Date())).toEqual(true);
        expect(util.check.isDate(test1)).toEqual(false);

        expect(util.check.isNumber(1)).toEqual(true);
        expect(util.check.isNumber(test1)).toEqual(false);

        expect(util.check.isBoolean(false)).toEqual(true);
        expect(util.check.isBoolean(test1)).toEqual(false);

        expect(util.check.isJSONString(JSON.stringify(test1))).toEqual(true);
        expect(util.check.isJSONString(test1)).toEqual(false);

        expect(util.check.isEmptyString('')).toEqual(true);
        expect(util.check.isEmptyString(test1)).toEqual(true);
        expect(util.check.isEmptyString('1')).toEqual(false);
    });
});
