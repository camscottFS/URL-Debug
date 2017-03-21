/* global beforeEach */
const expect = require('chai').expect;
const util = require('../debugger');
require('mocha-sinon');

describe('Running Debugger Tests:', () => {
  beforeEach(function () {
    this.sinon.stub(console, 'log');
    this.sinon.stub(console, 'error');
    this.sinon.stub(console, 'warn');
  });

  it('test for error has run', (done) => {
    util.debug('Error', 'error');
    expect(console.error.calledOnce).to.be.true;
    done();
  });

  it('test for warn has run', (done) => {
    util.debug('Warning!', 'warn');
    expect(console.warn.calledOnce).to.be.true;
    done();
  });

  it('All tests:', (done) => {
    util.debug('testing', 'log');
    /* eslint-disable no-unused-expressions */
    expect(console.log.calledOnce).to.be.true;
    done();
  });
});
