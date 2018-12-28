describe('native log objects', function () {
    'use strict';

    var preservedConsoleLog;
    var logger;
    var logArg1;
    var logArg2;
    var logArg3;
    var logArg4;

    var errorFn = function () {};
    var object1 = {foo: 'bar'};
    var arr1 = ['foo', 'bar'];

    beforeEach(function () {
        logArg1 = '';
        logArg2 = '';
        logArg3 = '';
        preservedConsoleLog = console.log;

        // overwrite console log so we can spy on it
        console.log = function (arg1, arg2, arg3, arg4) {
            logArg1 = arg1;
            logArg2 = arg2;
            logArg3 = arg3;
            logArg4 = arg4;
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

        it('should be able to log multiple objects', function () {
            logger.log('error', object1, arr1, errorFn);

            expect('[ERROR]: ').toEqual(logArg1);
            expect(object1).toEqual(logArg2);
            expect(arr1).toEqual(logArg3);
            expect(errorFn).toEqual(logArg4);
        });

        it('should be able to log multiple objects when using shortcuts', function () {
            logger.error(object1, arr1, errorFn);

            expect('[ERROR]: ').toEqual(logArg1);
            expect(object1).toEqual(logArg2);
            expect(arr1).toEqual(logArg3);
            expect(errorFn).toEqual(logArg4);
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

        it('should be able to log multiple objects', function () {
            logger.log('error', object1, arr1, errorFn);

            expect('%c[ERROR]: ').toEqual(logArg1);
            expect([object1, arr1, errorFn]).toEqual(logArg3);
        });

        it('should be able to log multiple objects when using shortcuts', function () {
            logger.error(object1, arr1, errorFn);

            expect('%c[ERROR]: ').toEqual(logArg1);
            expect([object1, arr1, errorFn]).toEqual(logArg3);
        });
    });
});
