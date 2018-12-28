describe('logger logLevel output', function () {
    'use strict';

    var value;
    var color;
    var preservedConsoleLog;

    beforeEach(function () {
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

    describe('logger output via shortcuts with set logLevel', function () {
        it('should respect the logLevel error', function () {
            var logger = new Logger({
                logLevel: 'error',
                colorMode: false,
                timeStamp: false,
                nativeLog: false
            });

            logger.debug('debug message should not be shown');
            expect(value).toEqual('');
            logger.info('info message should not be shown');
            expect(value).toEqual('');
            logger.warn('warn message should not be shown');
            expect(value).toEqual('');

            logger.error('error message');
            expect('[ERROR]: error message').toEqual(value);
        });

        it('should respect the logLevel warn', function () {
            var logger = new Logger({
                logLevel: 'warn',
                colorMode: false,
                timeStamp: false,
                nativeLog: false
            });

            logger.debug('debug message should not be shown');
            expect(value).toEqual('');
            logger.info('info message should not be shown');
            expect(value).toEqual('');

            logger.warn('warn message');
            expect('[WARN]: warn message').toEqual(value);
            logger.error('error message');
            expect('[ERROR]: error message').toEqual(value);
        });

        it('should respect the logLevel info', function () {
            var logger = new Logger({
                logLevel: 'info',
                colorMode: false,
                timeStamp: false,
                nativeLog: false
            });

            logger.debug('debug message should not be shown');
            expect(value).toEqual('');

            logger.info('info message');
            expect('[INFO]: info message').toEqual(value);
            logger.warn('warn message');
            expect('[WARN]: warn message').toEqual(value);
            logger.error('error message');
            expect('[ERROR]: error message').toEqual(value);
        });

        it('should respect the logLevel debug', function () {
            var logger = new Logger({
                logLevel: 'debug',
                colorMode: false,
                timeStamp: false,
                nativeLog: false
            });

            logger.debug('debug message');
            expect('[DEBUG]: debug message').toEqual(value);
            logger.info('info message');
            expect('[INFO]: info message').toEqual(value);
            logger.warn('warn message');
            expect('[WARN]: warn message').toEqual(value);
            logger.error('error message');
            expect('[ERROR]: error message').toEqual(value);
        });
    });

    describe('logger output with set logLevel and passing loglevel as param', function () {
        it('should respect the logLevel error', function () {
            var logger = new Logger({
                logLevel: 'error',
                colorMode: false,
                timeStamp: false,
                nativeLog: false
            });

            logger.log('debug', 'debug message should not be shown');
            expect(value).toEqual('');
            logger.log('info', 'info message should not be shown');
            expect(value).toEqual('');
            logger.log('warn', 'warn message should not be shown');
            expect(value).toEqual('');

            logger.log('error', 'error message');
            expect('[ERROR]: error message').toEqual(value);
        });

        it('should respect the logLevel warn', function () {
            var logger = new Logger({
                logLevel: 'warn',
                colorMode: false,
                timeStamp: false,
                nativeLog: false
            });

            logger.log('debug', 'debug message should not be shown');
            expect(value).toEqual('');
            logger.log('info', 'info message should not be shown');
            expect(value).toEqual('');

            logger.log('warn', 'warn message');
            expect('[WARN]: warn message').toEqual(value);
            logger.log('error', 'error message');
            expect('[ERROR]: error message').toEqual(value);
        });

        it('should respect the logLevel info', function () {
            var logger = new Logger({
                logLevel: 'info',
                colorMode: false,
                timeStamp: false,
                nativeLog: false
            });

            logger.log('debug', 'debug message should not be shown');
            expect(value).toEqual('');

            logger.log('info', 'info message');
            expect('[INFO]: info message').toEqual(value);
            logger.log('warn', 'warn message');
            expect('[WARN]: warn message').toEqual(value);
            logger.log('error', 'error message');
            expect('[ERROR]: error message').toEqual(value);
        });

        it('should respect the logLevel debug', function () {
            var logger = new Logger({
                logLevel: 'debug',
                colorMode: false,
                timeStamp: false,
                nativeLog: false
            });

            logger.log('debug', 'debug message');
            expect('[DEBUG]: debug message').toEqual(value);
            logger.log('info', 'info message');
            expect('[INFO]: info message').toEqual(value);
            logger.log('warn', 'warn message');
            expect('[WARN]: warn message').toEqual(value);
            logger.log('error', 'error message');
            expect('[ERROR]: error message').toEqual(value);
        });
    });
});
