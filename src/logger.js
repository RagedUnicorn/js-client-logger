var Logger = function (options) {
    'use strict';

    var retainedLog,
        retainedWarn,
        retainedError,
        retainedInfo,
        retainedDebug;

    var defaults = {
        logLevel: 'debug',
        colorMode: false,
        timeStamp: true,
        nativeLog: true
    };

    var logActive = true;
    var levels = ['debug', 'info', 'warn', 'error'];
    var config;
    var colors = {
        error: '#FF0000', // red
        warn: '#FFA500', // orange
        info: '#0000FF', // blue
        debug: '#CC367E' // magenta
    };

    /**
     * @param {Object} options
     * @return {Object} merged object
     */
    function checkConfig(options) {
        if (options.hasOwnProperty('logLevel')) {
            if (levels.indexOf(options.logLevel) === -1) {
                throw new Error('checkConfig(): invalid logLevel');
            }
        }

        if (options.hasOwnProperty('colorMode')) {
            if (typeof options.colorMode !== 'boolean') {
                throw new Error('checkConfig(): colorMode must be a boolean');
            }
        }
    }

    /**
     * @return true if the loglevel is available, false if not
     */
    function isLogLevelActive(level) {
        if (levels.indexOf(level) >= levels.indexOf(config.logLevel) && logActive) {
            return true;
        }
        return false;
    }

    /**
     * stringify objects and handle function logging
     * @param {String} level
     * @param {Object} args
     * @return {String} prepared message
     */
    function buildLogMessage(level, args) {
        var message = [];

        for (var i = 0; i < args.length; i++) {
            var item = args[i];

            if (util.isFunction(item)) {
                message.push('[Function]');
            } else if (typeof item !== 'string' && !util.isNumber(item)) {
                message.push(JSON.stringify(item, null, 4));
            } else {
                message.push(item);
            }
        }

        return message;
    }

    /**
     * @return {String} string with a timestamp
     */
    function addTimeStamp() {
        return '[' + util.createDate() + ']';
    }

    /**
     * @param {String} level
     * @return {String} string with loglevel
     */
    function addLogLevel(level) {
        return '[' + level.toUpperCase() + ']: ';
    }

    /**
     * disable console.* functions
     */
    function disableLog() {
        logActive = false;

        retainedLog = console.log;
        retainedDebug = console.debug;
        retainedInfo = console.info;
        retainedWarn = console.warn;
        retainedError = console.error;

        console.log = function () {};
        console.debug = function () {};
        console.info = function () {};
        console.warn = function () {};
        console.error = function () {};
    }

    /**
     * enable console.* functions
     */
    function enableLog() {
        logActive = true;

        console.log = retainedLog;
        console.debug = retainedDebug;
        console.info = retainedInfo;
        console.warn = retainedWarn;
        console.error = retainedError;
    }

    if (options !== undefined && Object.prototype.toString.call(options) !== '[object Object]') {
        throw new Error('invalid config - expected an object');
    }

    // if a options object is passed merge it with the defaults
    if (options) {
        checkConfig(options);
        config = util.merge(defaults, options);
    } else {
        config = defaults;
    }

    return {
        log: function (level, args) {
            var logMessage = '';

            if (!args) {
                throw new Error('log(): Missing parameter');
            }

            if (levels.indexOf(level) === -1) {
                throw new Error('log(): Invalid loglevel');
            }

            // direct call to log
            if (!util.isArguments(args)) {
                args = Array.prototype.slice.call(arguments);
                level = args.splice(0, 1)[0]; // get level
            } else {
                args = Array.prototype.slice.call(args);
            }

            if (isLogLevelActive(level)) {
                if (config.timeStamp) {
                    logMessage = addTimeStamp();
                }

                logMessage += addLogLevel(level);

                if (config.nativeLog) {
                    // native logging
                    if (config.colorMode) {
                        // unwrap single args
                        if (args.length === 1) {
                            args = args[0];
                        }
                        console.log.call(console, '%c' + logMessage, 'color: ' + colors[level], args);
                    } else {
                        args.unshift(logMessage);
                        console.log.apply(console, args);
                    }
                } else {
                    // stringify object and handle functions
                    logMessage += buildLogMessage(level, args);

                    if (config.colorMode) {
                        console.log('%c' + logMessage, 'color: ' + colors[level]);
                    } else {
                        console.log(logMessage);
                    }
                }
            }
        },
        error: function () {
            this.log('error', arguments);
        },
        warn: function () {
            this.log('warn', arguments);
        },
        info: function () {
            this.log('info', arguments);
        },
        debug: function () {
            this.log('debug', arguments);
        },
        disableLog: function () {
            disableLog();
        },
        enableLog: function () {
            enableLog();
        },
        isDebugEnabled: function () {
            return isLogLevelActive('debug');
        },
        isInfoEnabled: function () {
            return isLogLevelActive('info');
        },
        isWarnEnabled: function () {
            return isLogLevelActive('warn');
        },
        isErrorEnabled: function () {
            return isLogLevelActive('error');
        }
    };
};
