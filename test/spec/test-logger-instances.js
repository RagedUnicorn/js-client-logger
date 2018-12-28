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

    describe('multiple logger instances', function () {
        it('should allow for multiple logger instances', function () {
            var errorLogger = new Logger({
                logLevel: 'error',
                colorMode: false,
                timeStamp: false,
                nativeLog: false
            });

            var infoLogger = new Logger({
                logLevel: 'info',
                colormode: false,
                timeStamp: false,
                nativeLog: false
            });

            errorLogger.info('info message should not be shown');
            expect(value).toEqual('');
            errorLogger.error('error message should be shown');
            expect(value).toEqual('[ERROR]: error message should be shown');

            value = ''; // reset value

            infoLogger.debug('debug message should not be shown');
            expect(value).toEqual('');
            infoLogger.info('info message should be shown');
            expect(value).toEqual('[INFO]: info message should be shown');
        });
    });
});
