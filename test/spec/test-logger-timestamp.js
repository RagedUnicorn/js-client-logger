describe('logger timestamp output', function () {
    'use strict';

    var value;
    var color;
    var preservedConsoleLog;
    var reg = /(\d{2}-){2}(\d){4}\s(((\d){2}):){2}(\d){2}\.(\d){0,3}/;

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

    it('should log a message with a timestamp', function () {
        var logger = new Logger({
            logLevel: 'debug',
            colorMode: false,
            timeStamp: true
        });
        var timeStamp;

        logger.log('debug', 'debug message');
        timeStamp = value.split(/\]\[/)[0].substr(1);

        expect(reg.test(timeStamp)).toBeTruthy();
    });

    it('should log a message with a timestamp even when colormode is activated', function () {
        var logger = new Logger({
            logLevel: 'debug',
            colorMode: true,
            timeStamp: true
        });
        var timeStamp;

        logger.log('debug', 'debug message');
        timeStamp = value.split(/\]\[/)[0].substr(1);

        expect(reg.test(timeStamp)).toBeTruthy();
    });
});
