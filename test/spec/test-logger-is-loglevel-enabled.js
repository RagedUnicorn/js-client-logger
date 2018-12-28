describe('isXXXXEnabled', function () {
    'use strict';

    it('should be able to check if debug level is enabled', function () {
        var logger1 = new Logger({
            logLevel: 'debug',
            colorMode: false
        });

        var logger2 = new Logger({
            logLevel: 'info',
            colorMode: false
        });

        expect(logger1.isDebugEnabled()).toBeTruthy();
        expect(logger2.isDebugEnabled()).toBeFalsy();
    });

    it('should be able to check if info level is enabled', function () {
        var logger1 = new Logger({
            logLevel: 'info',
            colorMode: false
        });

        var logger2 = new Logger({
            logLevel: 'warn',
            colorMode: false
        });

        expect(logger1.isInfoEnabled()).toBeTruthy();
        expect(logger2.isInfoEnabled()).toBeFalsy();
    });

    it('should be able to check if warn level is enabled', function () {
        var logger1 = new Logger({
            logLevel: 'warn',
            colorMode: false
        });

        var logger2 = new Logger({
            logLevel: 'error',
            colorMode: false
        });

        expect(logger1.isWarnEnabled()).toBeTruthy();
        expect(logger2.isWarnEnabled()).toBeFalsy();
    });

    it('should be able to check if error level is enabled', function () {
        var logger = new Logger({
            logLevel: 'error',
            colorMode: false
        });

        expect(logger.isErrorEnabled()).toBeTruthy();
    });
});
