var util = {};

/**
 * @param {Object} obj
 * @return true if it is an object, false if not
 */
util.isObject = function (obj) {
    'use strict';

    return Object.prototype.toString.call(obj) === '[object Object]';
};

/**
 * @param {Number} numb
 * @return true if it is a number, false if not
 */
util.isNumber = function (num) {
    'use strict';

    return !isNaN(parseFloat(num)) && isFinite(num);
};

/**
 * @param {Object} obj
 * @return true if it is an array, false if not
 */
util.isArray = function (obj) {
    'use strict';

    return Object.prototype.toString.call(obj) === '[object Array]';
};

/**
 * @param {Object} obj
 * @return true if it is an arguments object, false if not
 */
util.isArguments = function (obj) {
    'use strict';

    return Object.prototype.toString.call(obj) === '[object Arguments]';
};

/**
 * @param {Object} obj
 * @return true if it is a function, false if not
 */
util.isFunction = function (obj) {
    'use strict';

    return Object.prototype.toString.call(obj) === '[object Function]';
};

/**
 * Merge objects into one. Multiple objects can be passed. Objects will be merged in the order they are passed
 * overwritting already set properties.
 * There will be a new object created, the passed objects are not modified
 */
util.merge = function () {
    'use strict';

    var obj = {},
        args = Array.prototype.slice.call(arguments);

    if (!args) {
        throw new Error('merge(): Missing parameter');
    }

    args.forEach(function (item) {
        // ignore non-objects
        if (!util.isObject(item)) {
            return;
        }

        for (var attr in item) {
            if (item.hasOwnProperty(attr)) {
                obj[attr] = item[attr];
            }
        }
    });

    return obj;
};

/**
 * pad number
 * @param {Number} n
 * @param {Number} width
 * @param {String} z
 * @return padded string if length was < than the expected length
 */
util.pad = function (n, width, z) {
    'use strict';

    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

/**
 * prints something like: 06-08-2013 21:16:54.784
 * @return {String} date-string
 */
util.createDate = function () {
    'use strict';

    var date = new Date();

    return this.pad(date.getMonth(), 2) + '-' +
        this.pad(date.getDate(), 2) + '-' +
        date.getFullYear() + ' ' +
        this.pad(date.getHours(), 2) + ':' +
        this.pad(date.getMinutes(), 2) + ':' +
        this.pad(date.getSeconds(), 2) + '.' +
        (this.pad(date.getMilliseconds(), 3));
};
