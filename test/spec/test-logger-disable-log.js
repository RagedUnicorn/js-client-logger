describe('disable log', function () {
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

    it('should be able to disable logging', function () {
        logger.disableLog();
        logger.error('error message');
        expect('').toEqual(value);
    });

    it('should be able to reenable logging', function () {
        logger.disableLog();
        logger.error('error message');
        expect('').toEqual(value);

        logger.enableLog();
        logger.error('error message');
        expect('[ERROR]: error message').toEqual(value);
    });

    it('should respect isEnabled', function () {
        logger.disableLog();

        expect(logger.isDebugEnabled()).toBeFalsy();
        expect(logger.isInfoEnabled()).toBeFalsy();
        expect(logger.isWarnEnabled()).toBeFalsy();
        expect(logger.isErrorEnabled()).toBeFalsy();
    });
});
