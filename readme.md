## Shurl Debugging Utility Tool

[ ![Codeship Status for camscottFS/URL-Debug](https://app.codeship.com/projects/a676aff0-efc5-0134-815f-56272b961867/status?branch=master)](https://app.codeship.com/projects/208917)

The ```.env``` file is located your root directory.

You'll need to add the following to the ```.env``` file:

```
DEBUG = true
DEBUG_CONSOLE = true
DEBUG_MSG_LOG = true
```

You can automatically install the Debugging tool as an NPM Package like this:

```
npm install shurl-debug --save
```

The files will then be saved in ```node_modules```

## Logging

To turn off the debugging tool can simply edit the ```.env``` file and change  ```DEBUG = true``` to ```DEBUG = false```

To prevent debug messages from appearing in the console you must change ```DEBUG_CONSOLE = true``` to ```DEBUG_CONSOLE = false```.

To disable logging of the .msg() method you must change ```DEBUG_MSG_LOG = true``` to  ```DEBUG_MSG_LOG = false```.

Below is an example of what you can expect the log to generate when the debugging tool is enabled:

```
Event at 15:05:19 @ server.js on line 30
SUCCESS
Server active on port 3000

Event at 15:05:22 @ app.js on line 15 GET:/status
SUCCESS
Server status is healthy!

Event at 15:05:27 @ app.js on line 41 GET:/urls
SUCCESS
Read all URLs

Event at 15:06:52 @ app.js on line 65 GET:/urls/:id
SUCCESS
Read URL by ID
```

To console log, use the commands for each type of log you want to generate
Info: `consoleLog.log('info', 'Log works!');`
Error: `consoleLog.log('info', 'Log works!');`
Warn: `consoleLog.log('info', 'Log works!');`

Logging is designed to work without invoking the console.log() function, which is against ES6 standard.

## Version Bumping

To log the version bumping functionality, simply require the functionality

`const version = require('debugger.js').packageVersion`

and then invoke it

`version('1.0.0', 'major')` using the parameters, `major`, `minor`, or `patch`, subsitituting your version in the version number parameter.
