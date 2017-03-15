## Shurl Debugging Utility Tool

The ```.env``` file is located in ```node_modules/shurl-debug/```

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