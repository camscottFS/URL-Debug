const consoleLog = require('../debugger.js');
const ver = require('../debugger.js').packageVersion;
const expect = require('chai').expect;

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

describe('Version Tests', () => {
  it('should update major version of package', () => {
    const v = ver('1.1.0', 'major');
    expect(v).to.equal('2.0.0');
  });
  it('should update minor version of package', () => {
    const v = ver('1.1.0', 'minor');
    expect(v).to.equal('1.2.0');
  });
  it('should update patch version of package', () => {
    const v = ver('1.1.1', 'patch');
    expect(v).to.equal('1.1.2');
  });
});
