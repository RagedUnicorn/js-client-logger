describe('logger color output', function () {
    'use strict';

    var value;
    var preservedConsoleLog;
    var logger;

    beforeEach(function () {
        value = '';
        preservedConsoleLog = console.log;

        // overwrite console log so we can spy on it
        console.log = function (str) {
            value = str;
        };

        logger = new Logger({
            logLevel: 'debug'
        });
    });

    afterEach(function () {
        console.log = preservedConsoleLog;
    });

    describe('should throw an error if a parameter is missing', function () {
        it('should throw an error when args parameter is missing', function () {
            expect(function () {
                logger.log('debug');
            }).toThrow(new Error('log(): Missing parameter'));
        });

        it('should throw an error when an invalid loglevel is passed', function () {
            expect(function () {
                logger.log('invalid loglevel', 'some message');
            }).toThrow(new Error('log(): Invalid loglevel'));
        });
    });
});
