const consoleLog = require('../debugger.js');

// Testing console logging outputs from our custom Logger
describe('Console Log Tests', () => {
  it('should log an info log to the console', () => {
    consoleLog.log('info', 'Log works!');
  });
  it('should log an error log to the console', () => {
    consoleLog.log('error', 'Log works!');
  });
  it('should log a warning log to the console', () => {
    consoleLog.log('warn', 'Log works!');
  });
});
