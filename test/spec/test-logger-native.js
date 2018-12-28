describe('native log enabled', function () {
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
            logger.log('error', 'error message');

            expect('[ERROR]: ').toEqual(logArg1);
            expect('error message').toEqual(logArg2);
        });

        it('should be able to log a warn message', function () {
            logger.log('warn', 'warn message');

            expect('[WARN]: ').toEqual(logArg1);
            expect('warn message').toEqual(logArg2);
        });

        it('should be able to log a info message', function () {
            logger.log('info', 'info message');

            expect('[INFO]: ').toEqual(logArg1);
            expect('info message').toEqual(logArg2);
        });

        it('should be able to log a debug message', function () {
            logger.log('debug', 'debug message');

            expect('[DEBUG]: ').toEqual(logArg1);
            expect('debug message').toEqual(logArg2);
        });

        it('should be able to log an error message when using shortcuts', function () {
            logger.error('error message');

            expect('[ERROR]: ').toEqual(logArg1);
            expect('error message').toEqual(logArg2);
        });

        it('should be able to log a warn message when using shortcuts', function () {
            logger.warn('warn message');

            expect('[WARN]: ').toEqual(logArg1);
            expect('warn message').toEqual(logArg2);
        });

        it('should be able to log a info message when using shortcuts', function () {
            logger.info('info message');

            expect('[INFO]: ').toEqual(logArg1);
            expect('info message').toEqual(logArg2);
        });

        it('should be able to log a debug message when using shortcuts', function () {
            logger.debug('debug message');

            expect('[DEBUG]: ').toEqual(logArg1);
            expect('debug message').toEqual(logArg2);
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
            logger.log('error', 'error message');

            expect('%c[ERROR]: ').toEqual(logArg1);
            expect('color: #FF0000').toEqual(logArg2);
            expect('error message').toEqual(logArg3);
        });

        it('should be able to log a warn message', function () {
            logger.log('warn', 'warn message');

            expect('%c[WARN]: ').toEqual(logArg1);
            expect('color: #FFA500').toEqual(logArg2);
            expect('warn message').toEqual(logArg3);
        });

        it('should be able to log a info message', function () {
            logger.log('info', 'info message');

            expect('%c[INFO]: ').toEqual(logArg1);
            expect('color: #0000FF').toEqual(logArg2);
            expect('info message').toEqual(logArg3);
        });

        it('should be able to log a debug message', function () {
            logger.log('debug', 'debug message');

            expect('%c[DEBUG]: ').toEqual(logArg1);
            expect('color: #CC367E').toEqual(logArg2);
            expect('debug message').toEqual(logArg3);
        });

        it('should be able to log an error message when using shortcuts', function () {
            logger.error('error message');

            expect('%c[ERROR]: ').toEqual(logArg1);
            expect('color: #FF0000').toEqual(logArg2);
            expect('error message').toEqual(logArg3);
        });

        it('should be able to log a warn message when using shortcuts', function () {
            logger.warn('warn message');

            expect('%c[WARN]: ').toEqual(logArg1);
            expect('color: #FFA500').toEqual(logArg2);
            expect('warn message').toEqual(logArg3);
        });

        it('should be able to log a info message when using shortcuts', function () {
            logger.info('info message');

            expect('%c[INFO]: ').toEqual(logArg1);
            expect('color: #0000FF').toEqual(logArg2);
            expect('info message').toEqual(logArg3);
        });

        it('should be able to log a debug message when using shortcuts', function () {
            logger.debug('debug message');

            expect('%c[DEBUG]: ').toEqual(logArg1);
            expect('color: #CC367E').toEqual(logArg2);
            expect('debug message').toEqual(logArg3);
        });
    });
});


