describe('logger color output', function () {
    'use strict';

    var value;
    var color;
    var preservedConsoleLog;
    var logger;

    beforeEach(function () {
        logger = new Logger({
            logLevel: 'debug',
            colorMode: true,
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

    it('should log an error message in the specified color', function () {
        logger.log('error', 'error message');
        expect('%c[ERROR]: error message').toEqual(value);
        expect('color: #FF0000').toEqual(color);
    });

    it('should log a warn message in the specified color', function () {
        logger.log('warn', 'warn message');
        expect('%c[WARN]: warn message').toEqual(value);
        expect('color: #FFA500').toEqual(color);
    });

    it('should log an info message in the specified color', function () {
        logger.log('info', 'info message');
        expect('%c[INFO]: info message').toEqual(value);
        expect('color: #0000FF').toEqual(color);
    });

    it('should log a debug message in the specified color', function () {
        logger.log('debug', 'debug message');
        expect('%c[DEBUG]: debug message').toEqual(value);
        expect('color: #CC367E').toEqual(color);
    });
});
