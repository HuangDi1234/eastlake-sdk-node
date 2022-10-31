const ArrayProto = Array.prototype;
const ObjProto = Object.prototype;
const slice = ArrayProto.slice;
const toString = ObjProto.toString;
const hasOwnProperty = ObjProto.hasOwnProperty;
const nativeForEach = ArrayProto.forEach;
const breaker = {};

let util = {
    each: function each(obj, iterator, context) {
        if (obj === null) {
            return;
        }
        if (nativeForEach && obj.forEach === nativeForEach) {
            obj.forEach(iterator, context);
        } else {
            for (let key in obj) {
                if (hasOwnProperty.call(obj, key)) {
                    if (iterator.call(context, obj[key], key, obj) === breaker) {
                        return;
                    }
                }
            }
        }
    },

    extend: function extend(obj) {
        util.each(slice.call(arguments, 1), function (source) {
            for (let prop in source) {
                if (source[prop] !== void 0) {
                    obj[prop] = source[prop];
                }
            }
        });
        return obj;
    },

    check: {
        isUndefined: function (obj) {
            return obj === void 0;
        },

        isObject: function (obj) {
            return (toString.call(obj) === '[object Object]') && (obj !== null);
        },

        isEmptyObject: function (obj) {
            if (util.check.isObject(obj)) {
                return Object.keys(obj).length === 0
            }
            return false;
        },

        isArray: function (obj) {
            return toString.call(obj) === '[object Array]';
        },

        isString: function (obj) {
            return toString.call(obj) === '[object String]';
        },

        isDate: function (obj) {
            return toString.call(obj) === '[object Date]';
        },

        isNumber: function (obj) {
            return toString.call(obj) === '[object Number]';
        },

        isBoolean: function (obj) {
            return toString.call(obj) === '[object Boolean]';
        },

        isJSONString: function (str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        },

        isEmptyString: function (str) {
            if (this.isString(str)) {
                if (str.trim() !== '') {
                    return false
                }
            }
            return true
        }
    },
}

module.exports = util;
