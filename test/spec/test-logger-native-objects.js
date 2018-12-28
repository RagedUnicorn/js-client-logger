describe('native log objects', function () {
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

        it('should be able to log an object', function () {
            logger.log('error', {foo: 'bar'});

            expect('[ERROR]: ').toEqual(logArg1);
            expect({foo: 'bar'}).toEqual(logArg2);
        });

        it('should be able to log an array', function () {
            logger.log('error', ['foo', 'bar']);

            expect('[ERROR]: ').toEqual(logArg1);
            expect(['foo', 'bar']).toEqual(logArg2);
        });

        it('should be able to log a function', function () {
            var errorFn = function () {};

            logger.log('error', errorFn);

            expect('[ERROR]: ').toEqual(logArg1);
            expect(errorFn).toEqual(logArg2);
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

        it('should be able to log an object', function () {
            logger.log('error', {foo: 'bar'});

            expect('%c[ERROR]: ').toEqual(logArg1);
            expect('color: #FF0000').toEqual(logArg2);
            expect({foo: 'bar'}).toEqual(logArg3);
        });

        it('should be able to log an array', function () {
            logger.log('error', ['foo', 'bar']);

            expect('%c[ERROR]: ').toEqual(logArg1);
            expect('color: #FF0000').toEqual(logArg2);
            expect(['foo', 'bar']).toEqual(logArg3);
        });

        it('should be able to log a function', function () {
            var errorFn = function () {};

            logger.log('error', errorFn);

            expect('%c[ERROR]: ').toEqual(logArg1);
            expect('color: #FF0000').toEqual(logArg2);
            expect(errorFn).toEqual(logArg3);
        });
    });

    describe('disabled color and shortcuts', function () {
        beforeEach(function () {
            logger = new Logger({
                logLevel: 'debug',
                colorMode: false,
                timeStamp: false,
                nativeLog: true
            });
        });

        it('should be able to log an object', function () {
            logger.error({foo: 'bar'});

            expect('[ERROR]: ').toEqual(logArg1);
            expect({foo: 'bar'}).toEqual(logArg2);
        });

        it('should be able to log an array', function () {
            logger.error(['foo', 'bar']);

            expect('[ERROR]: ').toEqual(logArg1);
            expect(['foo', 'bar']).toEqual(logArg2);
        });

        it('should be able to log a function', function () {
            var errorFn = function () {};

            logger.error(errorFn);

            expect('[ERROR]: ').toEqual(logArg1);
            expect(errorFn).toEqual(logArg2);
        });
    });

    describe('enabled color and shortcuts', function () {
        beforeEach(function () {
            logger = new Logger({
                logLevel: 'debug',
                colorMode: true,
                timeStamp: false,
                nativeLog: true
            });
        });

        it('should be able to log an object', function () {
            logger.error({foo: 'bar'});

            expect('%c[ERROR]: ').toEqual(logArg1);
            expect('color: #FF0000').toEqual(logArg2);
            expect({foo: 'bar'}).toEqual(logArg3);
        });

        it('should be able to log an array', function () {
            logger.error(['foo', 'bar']);

            expect('%c[ERROR]: ').toEqual(logArg1);
            expect('color: #FF0000').toEqual(logArg2);
            expect(['foo', 'bar']).toEqual(logArg3);
        });

        it('should be able to log a function', function () {
            var errorFn = function () {};

            logger.error(errorFn);

            expect('%c[ERROR]: ').toEqual(logArg1);
            expect('color: #FF0000').toEqual(logArg2);
            expect(errorFn).toEqual(logArg3);
        });
    });
});
