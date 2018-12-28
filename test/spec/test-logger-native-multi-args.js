describe('native log multiple arguments', function () {
    'use strict';

    var preservedConsoleLog;
    var logger;
    var logArg1;
    var logArg2;
    var logArg3;

    beforeEach(function () {
        logArg1 = '';
        logArg2 = '';
        logArg3 = '';
        preservedConsoleLog = console.log;

        // overwrite console log so we can spy on it
        console.log = function (arg1, arg2, arg3) {
            logArg1 = arg1;
            logArg2 = arg2;
            logArg3 = arg3;
        };
    });

    afterEach(function () {
        console.log = preservedConsoleLog;
    });


    describe('disabled color', function () {
        beforeEach(function () {
            logger = new Logger({
                logLevel: 'debug',
                colorMode: false,
                timeStamp: false,
                nativeLog: true
            });
        });

        it('should be able to log an error message', function () {
            logger.log('error', 'error message', 'additional message');

            expect('[ERROR]: ').toEqual(logArg1);
            expect('error message').toEqual(logArg2);
        });

        it('should be able to log an error message when using shortcuts', function () {
            logger.error('error message', 'additional message');

            expect('[ERROR]: ').toEqual(logArg1);
            expect('error message').toEqual(logArg2);
        });
    });

    describe('enabled color', function () {
        beforeEach(function () {
            logger = new Logger({
                logLevel: 'debug',
                colorMode: true,
                timeStamp: false,
                nativeLog: true
            });
        });

        it('should be able to log an error message', function () {
            logger.log('error', 'error message', 'additional message');

            expect('%c[ERROR]: ').toEqual(logArg1);
            expect('color: #FF0000').toEqual(logArg2);
            expect(['error message', 'additional message']).toEqual(logArg3);
        });

        it('should be able to log an error message when using shortcuts', function () {
            logger.error('error message', 'additional message');

            expect('%c[ERROR]: ').toEqual(logArg1);
            expect('color: #FF0000').toEqual(logArg2);
            expect(['error message', 'additional message']).toEqual(logArg3);
        });
    });
});
