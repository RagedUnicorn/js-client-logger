describe('logger output test', function () {
    'use strict';

    var value;
    var color;
    var preservedConsoleLog;
    var logger;

    beforeEach(function () {
        logger = new Logger({
            logLevel: 'debug',
            colorMode: false,
            timeStamp: false,
            nativeLog: false
        });

        value = '';
        preservedConsoleLog = console.log;

        // overwrite console log so we can spy on it
        console.log = function (str, style) {
            value = str;
            color = style;
        };
    });

    afterEach(function () {
        console.log = preservedConsoleLog;
    });

    describe('logger output via shortcuts', function () {
        it('should log an error message', function () {
            logger.error('error message');
            expect('[ERROR]: error message').toEqual(value);
        });

        it('should log a warn message', function () {
            logger.warn('warn message');
            expect('[WARN]: warn message').toEqual(value);
        });

        it('should log an info message', function () {
            logger.info('info message');
            expect('[INFO]: info message').toEqual(value);
        });

        it('should log a debug message', function () {
            logger.debug('debug message');
            expect('[DEBUG]: debug message').toEqual(value);
        });
    });

    describe('logger output passing loglevel as param', function () {
        it('should log an error message', function () {
            logger.log('error', 'error message');
            expect('[ERROR]: error message').toEqual(value);
        });

        it('should log a warn message', function () {
            logger.log('warn', 'warn message');
            expect('[WARN]: warn message').toEqual(value);
        });

        it('should log an info message', function () {
            logger.log('info', 'info message');
            expect('[INFO]: info message').toEqual(value);
        });

        it('should log a debug message', function () {
            logger.log('debug', 'debug message');
            expect('[DEBUG]: debug message').toEqual(value);
        });
    });

    describe('logger output multiple arguments', function () {
        it('should be able to log multiple statements', function () {
            logger.error('error1', 'error2');
            expect('[ERROR]: error1,error2').toEqual(value);
        });

        it('should be able to log multiple statements when using logging via shortcuts', function () {
            logger.log('error', 'error1', 'error2');
            expect('[ERROR]: error1,error2').toEqual(value);
        });

        it('should be able to handle objects as arguments', function () {
            var foo = {
                'foo': 'bar'
            };

            logger.error(foo);
            expect('[ERROR]: ' + JSON.stringify({foo: 'bar'}, null, 4)).toEqual(value);
        });

        it('should be able to handle objects as arguments when logging via shortcuts', function () {
            var foo = {
                'foo': 'bar'
            };

            logger.log('error', foo);
            expect('[ERROR]: ' + JSON.stringify({foo: 'bar'}, null, 4)).toEqual(value);
        });

        it('should be able to detect functions and convert them', function () {
            var foo = function () {};

            logger.error(foo);
            expect('[ERROR]: [Function]').toEqual(value);
        });

        it('should be able to detect functions and convert them when logging via shortcuts', function () {
            var foo = function () {};

            logger.log('error', foo);
            expect('[ERROR]: [Function]').toEqual(value);
        });
    });
});
