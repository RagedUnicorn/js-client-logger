describe('logger color output', function () {
    'use strict';

    var value;
    var preservedConsoleLog;

    beforeEach(function () {
        value = '';
        preservedConsoleLog = console.log;

        // overwrite console log so we can spy on it
        console.log = function (str) {
            value = str;
        };
    });

    afterEach(function () {
        console.log = preservedConsoleLog;
    });

    describe('should throw an error if an ivalid parameter was passed to setLogLevel', function () {
        it('should throw an error when passing an empty string', function () {
            var logger;

            expect(function () {
                logger = new Logger({
                    logLevel: ''
                });
            }).toThrow(new Error('checkConfig(): invalid logLevel'));
            expect(logger).toBeUndefined();
        });

        it('should throw an error when passing a number', function () {
            var logger;

            expect(function () {
                logger = new Logger({
                    logLevel: 0
                });
            }).toThrow(new Error('checkConfig(): invalid logLevel'));
            expect(logger).toBeUndefined();
        });

        it('should throw an error when passing a boolean value', function () {
            var logger;

            expect(function () {
                logger = new Logger({
                    logLevel: true
                });
            }).toThrow(new Error('checkConfig(): invalid logLevel'));
            expect(logger).toBeUndefined();
        });
    });

    describe('should not throw an error if a valid parameter was passed to setLogLevel', function () {
        it('should not throw an error when passing debug as loglevel', function () {
            var logger;

            expect(function () {
                logger = new Logger({
                    logLevel: 'debug'
                });
            }).not.toThrow(new Error('checkConfig(): invalid logLevel'));
            expect(logger).toBeDefined();
        });

        it('should not throw an error when passing info as loglevel', function () {
            var logger;

            expect(function () {
                logger = new Logger({
                    logLevel: 'info'
                });
            }).not.toThrow(new Error('checkConfig(): invalid logLevel'));
            expect(logger).toBeDefined();
        });

        it('should not throw an error when passing warn as loglevel', function () {
            var logger;

            expect(function () {
                logger = new Logger({
                    logLevel: 'warn'
                });
            }).not.toThrow(new Error('checkConfig(): invalid logLevel'));
            expect(logger).toBeDefined();
        });

        it('should not throw an error when passing error as loglevel', function () {
            var logger;

            expect(function () {
                logger = new Logger({
                    logLevel: 'error'
                });
            }).not.toThrow(new Error('checkConfig(): invalid logLevel'));
            expect(logger).toBeDefined();
        });
    });

    describe('should throw an error if an ivalid parameter was passed to setColorMode', function () {
        it('should throw an error when passing an empty string', function () {
            var logger;

            expect(function () {
                logger = new Logger({
                    colorMode: ''
                });
            }).toThrow(new Error('checkConfig(): colorMode must be a boolean'));
            expect(logger).toBeUndefined();
        });

        it('should throw an error when passing a number', function () {
            var logger;

            expect(function () {
                logger = new Logger({
                    colorMode: 0
                });
            }).toThrow(new Error('checkConfig(): colorMode must be a boolean'));
            expect(logger).toBeUndefined();
        });

        it('should throw an error when passing a string', function () {
            var logger;

            expect(function () {
                logger = new Logger({
                    colorMode: 'false'
                });
            }).toThrow(new Error('checkConfig(): colorMode must be a boolean'));
            expect(logger).toBeUndefined();
        });
    });

    describe('should not throw an error if a valid parameter was passed to setColorMode', function () {
        it('should not throw an error when passing a boolean value', function () {
            var logger;

            expect(function () {
                logger = new Logger({
                    colorMode: false
                });
            }).not.toThrow(new Error('checkConfig()): invalid logLevel'));
            expect(logger).toBeDefined();
        });
    });

    describe('should throw an error if there was an invalid parameter passed to setConfig', function () {
        it('should throw an error when passing a string', function () {
            var logger;

            expect(function () {
                logger = new Logger('foo');
            }).toThrow(new Error('invalid config - expected an object'));
            expect(logger).toBeUndefined();
        });

        it('should throw an error when passing an array', function () {
            var logger;

            expect(function () {
                logger = new Logger([]);
            }).toThrow(new Error('invalid config - expected an object'));
            expect(logger).toBeUndefined();
        });
    });

    describe('should not throw an error if there was a valid parameter passed to setConfig', function () {
        it('should not throw an error if an empty object was passed', function () {
            var logger;

            expect(function () {
                logger = new Logger({});
            }).not.toThrow(new Error('invalid config - expected an object'));
            expect(logger).toBeDefined();
        });

        it('should not throw an error if a valid config object was passed', function () {
            var logger;

            expect(function () {
                logger = new Logger({
                    logLevel: 'debug',
                    colorMode: true
                });
            }).not.toThrow(new Error('invalid config - expected an object'));
            expect(logger).toBeDefined();
        });
    });
});
