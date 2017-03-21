/*
Cameron Scott
Deployment of Web Applications
March 2017
Assignment 5: Unit Tests
*/

const fs = require('fs');
require('dotenv').config();
// Using Winston to console log so we don't directly access console.log(): not ESLint compliant
const winston = require('winston');

const consoleLog = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    //new (winston.transports.File)({ filename: 'somefile.log' }),
  ],
});

module.exports = {
  getDate() {
      // setup variables for dataobject, month, day, year
    const dateObj = new Date();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    const date = year + '_' + month + '_' + day;
    return date;
  },
  getTime() {
      // setup variables for dateobject
    const dateObj = new Date();
    const h = dateObj.getHours();
    let m = dateObj.getMinutes();
    if (m < 10) {
      m = `${0}` + m;
    }
    const s = dateObj.getSeconds();
    const time = h + ':' + m + ':' + s;
    return time;
  },
  debugWarn() {
    const debug = process.env.DEBUG;
    // if debug is true then send the message
    if (debug === 'true') {
      consoleLog.log('info', '\n~~~~~~~~~~~~~~~~~~~~~\nDebug mode is active!\n~~~~~~~~~~~~~~~~~~~~~\n');
    }
  },
  debug(data) {
    const debug = process.env.DEBUG;
    if (debug === 'true') {
      // setup variables for logdata, logreq, date, time
      let logData = '';
      let logReq = '';
      const date = this.getDate();
      const time = this.getTime();
      // setup variables for the colors
      const resetColor = '\x1b[0m';
      const successColor = '\x1b[32m';
      const errorColor = '\x1b[31m';
      const defaultColor = '\x1b[33m';
      let type = defaultColor + data.type.toUpperCase() + resetColor;
      if (data.data && !data.data.data && data.type !== 'error') {
        data.type = 'warning - request returned null';
      }
      if (data.type === 'success') {
        type = successColor + data.type.toUpperCase() + resetColor;
      } else if (data.type === 'error') {
        type = errorColor + data.type.toUpperCase() + resetColor;
      } else {
        type = defaultColor + data.type.toUpperCase() + resetColor;
      }
      let logMsg = '\n~~~~~~~~~~~~~~~~~~~~\nEvent at ' + time + ' @ ' + data.location + '\n' + type + '\n' + data.msg;
      let logFile = '\n~~~~~~~~~~~~~~~~~~~~\nEvent at ' + time + ' @ ' + data.location + '\n' + data.type.toUpperCase() + '\n' + data.msg;
      if (data.data && data.type !== 'error') {
        logData = '\nReturned Data: \n-- ' + JSON.stringify(data.data).split(',').join('\n    ').replace(/[{}"]/g, ' ');
      }
      if (data.type === 'error') {
        logData = '\nReturned Data: \n ' + data.data;
      }
      if (data.request) {
        logReq = '\nRequested Data: \n-- ' + JSON.stringify(data.request).split(',').join('\n    ').replace(/[{}"]/g, ' ');
      }
      logMsg += logData;
      logMsg += logReq;
      logFile += logData;
      logFile += logReq;

      fs.appendFile('./logs/debug_log_' + date + '.log', '\n' + logFile, (err) => {
        if (err) throw err;
        const consoleDebug = process.env.DEBUG_CONSOLE;
        if (consoleDebug === 'true') {
          // if console.debug is true then console log the logmsg
          consoleLog.log('info', logMsg);
        }
      });
    }
  },
  // setup message with data and location
  msg(data, loc) {
    // if theres not a location information then send this
    if (loc === undefined) {
      loc = 'No location information!';
    }
    // set vars for debug and consoledebug (environmental variables)
    const debug = process.env.DEBUG;
    const consoleDebug = process.env.DEBUG_CONSOLE;
    if (debug === 'true' && consoleDebug === 'true') {
      // console log the message
      consoleLog.log('info', '\x1b[37mMSG:\x1b[0m ' + data + '\n-- @ ' + loc);
    }
    this.saveMsg(data, loc);
  },
  saveMsg(data, loc) {
    const debug = process.env.DEBUG;
    const msgSave = process.env.DEBUG_MSG_LOG;
    const date = this.getDate();
    const time = this.getTime();
    if (loc === undefined) {
      loc = 'No location information!';
    }
    if (debug === 'true' && msgSave === 'true') {
      // create the log
      const msgLog = '-- MSG @ ' + time + ' (' + loc + '): ' + data + '\n';
      // append entry to the current day's log
      fs.appendFile('./logs/debug_msg_' + date + '.log', msgLog, (err) => {
        if (err) throw err;
      });
    }
  },
};

module.exports = consoleLog;
module.exports.stream = {
  write: (message) => {
    consoleLog.info(message);
  },
};

// Version incrementer
module.exports.packageVersion = (current, release) => {
  const version = current.split('.');
  let n;
  if (version.length === 3) {
    if (release === 'major') {
      n = parseInt(version[0], 10) + 1;
      return `${n}.0.0`;
    } else if (release === 'minor') {
      n = parseInt(version[1], 10) + 1;
      return `${version[0]}.${n}.0`;
    } else if (release === 'patch') {
      n = parseInt(version[2], 10) + 1;
      return `${version[0]}.${version[1]}.${n}`;
    }
    return 'Invalid version.';
  }
  return 'Invalid version.';
};
