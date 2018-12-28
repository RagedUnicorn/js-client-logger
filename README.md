# js-client-logger

> A small helper for clientside logging

## Usage

Instantiate a new logger to start

```js
var logger = new Logger();
```

A logger takes an optional config parameter

```js
var logger = new Logger({
    logLevel: 'debug',
    colorMode: false,
    timeStamp: true,
    nativeLog: true
});
```

There are two ways of logging

```js
logger.log([level], [message]);

// or

logger.[level]([message]);
```

Example:

```js
logger.log('info', 'info message');
logger.error('error message');
```

## Debug levels in order

- debug
- info
- warn
- error

## Options

### logLevel

Type `String` Default value `debug`

Sets the level of which messages should get displayed.

### colorMode

Type `Boolean` Default value `false`

Displays logs with color if set to true.  
**Note:** This does only work in google chrome (version >= 24) and the firebug console for firefox.

- error (red)
- warn (yellow)
- info (cyan)
- debug (magenta)

### timeStamp

Type `Boolean` Default value `true`

Will prepend the logmessage with a timestamp in the form of: 06-08-2013 21:16:54.784

### nativeLog

Type `Boolean`Default value `true`

Whether to use native browser logging or custom logging. When using native logging, objects can be more easily inspected in modern browsers and it overall handles logging of multiple and complex objects better. When native logging is disabled objects are stringified before printed.

Also note that Internet Explorer doesn't handle nativeLogging.

## Disable logging

Logging can get completely disabled and enabled at a later point.  
**Note:** Disables the following native logging functions:

- console.log
- console.debug
- console.info
- console.warn
- console.error

```js
logger.disableLog();
console.log('will not be displayed');

logger.enableLog();
console.log('will be displayed');
```

## Check if loglevel is enabled

For every loglevel there is a method to check if the current loglevel is available. This can be used as a little performance boost,
when concatenating long strings or doing some other work before logging.

```js
logger.isDebugEnabled()
logger.isInfoEnabled();
logger.isWarnEnabled();
logger.isErrorEnabled();
```
Example:

```js
var logger = new Logger({
    logLevel: 'warn'
});

if (logger.isWarnEnabled()) {
    logger.warn('warn message');
}
```

If logging was previously disabled with `logger.disableLog()` all of this methods will return `false`.

## Grunt
This project uses grunt and has pre-configured tasks for linting and running a testsuite. To get started install all dependencies with:

```js
npm install
```

Then use `grunt test` and `grunt lint` to start the tasks

## License

Copyright (c) 2018 Michael Wiesendanger

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
