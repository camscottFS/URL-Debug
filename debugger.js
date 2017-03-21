/*
Cameron Scott
Deployment of Web Applications
March 2017
Assignment 5: Unit Tests
*/
const colors = require('colors');
const fs = require('fs');
require('dotenv').config()
module.exports = {
    getDate() {
      // setup variables for dataobject, month, day, year
      let dateObj = new Date();
      let month = dateObj.getMonth() + 1;
      let day = dateObj.getDate();
      let year = dateObj.getFullYear();
      let date = year + '_' + month + '_' + day;
      return date;
    },
    getTime() {
      // setup variables for dateobject
      let dateObj = new Date;
      let h = dateObj.getHours();
      let m = dateObj.getMinutes();
      if(m < 10){
          m = `${0}` + m;
      }
      let s = dateObj.getSeconds();
      let time = h + ':' + m + ':' + s;
      return time;
    },
    debugWarn() {
        let debug = process.env.DEBUG;
        // if debug is true then send the message
        if(debug === 'true') {
          console.warn('\n~~~~~~~~~~~~~~~~~~~~~\nDebug mode is active!\n~~~~~~~~~~~~~~~~~~~~~\n');
        }
    },
    debug(data, type) {
      let debug = process.env.DEBUG;
      if (debug === 'true'){
          // setup variables for logdata, logreq, date, time
        let logData = '';
        let logReq = '';
        let date = this.getDate();
        let time = this.getTime();
        // setup variables for the colors
        let resetColor = '\x1b[0m';
        let successColor = '\x1b[32m';
        let errorColor = '\x1b[31m';
        let defaultColor = '\x1b[33m';
        let type = defaultColor + data.type.toUpperCase() + resetColor
        if(data.data && !data.data.data && data.type != 'error'){
          data.type = "warning - request returned null";
          }
          if(data.type === 'success'){
            type = successColor + data.type.toUpperCase() + resetColor;
          } else if(data.type === 'error'){
              type = errorColor + data.type.toUpperCase() + resetColor;
            } else {
                type = defaultColor + data.type.toUpperCase() + resetColor;
            }
            let logMsg = "\n~~~~~~~~~~~~~~~~~~~~\nEvent at " + time + " @ "+data.location+"\n" + type + "\n" + data.msg;
            let logFile = "\n~~~~~~~~~~~~~~~~~~~~\nEvent at " + time + " @ "+data.location+"\n" + data.type.toUpperCase() + "\n" + data.msg;
            if(data.data && data.type != 'error'){
              logData = "\nReturned Data: \n-- " + JSON.stringify(data.data).split(",").join("\n    ").replace(/[{}"]/g , " ");
            }
            if(data.type === "error"){
              logData = "\nReturned Data: \n "+ data.data;
            }
            if(data.request){
              logReq = "\nRequested Data: \n-- " + JSON.stringify(data.request).split(",").join("\n    ").replace(/[{}"]/g , " ");
            }
            logMsg += logData
            logMsg += logReq
            logFile += logData
            logFile += logReq

            fs.appendFile('./logs/debug_log_' + date + '.log', '\n' + logFile, (err) => {
                if (err) throw err;
                let consoleDebug = process.env.DEBUG_CONSOLE;
                if (consoleDebug === 'true'){
                  // if console.debug is true then console log the logmsg
                  console.log(logMsg);
                }
         })
     } else { }
    },
    //setup message with data and location
    msg(data, loc) {
      // if theres not a location information then send this
      if(loc === undefined){
        loc = 'No location information!';
      }
      // set vars for debug and consoledebug (environmental variables)
      let debug = process.env.DEBUG;
      let consoleDebug = process.env.DEBUG_CONSOLE;
      if (debug === 'true' && consoleDebug === 'true'){
        // console log the message
        console.log("\x1b[37mMSG:\x1b[0m " + data + '\n-- @ ' + loc);
      }
      this.saveMsg(data, loc);
    },
    saveMsg(data, loc) {
      let debug = process.env.DEBUG;
      let msgSave = process.env.DEBUG_MSG_LOG;
      let date = this.getDate();
      let time = this.getTime();
      if(loc === undefined){
        loc = 'No location information!';
      }
      if(debug === 'true' && msgSave === 'true') {
        // create the log
        msgLog = '-- MSG @ ' + time + ' ('+ loc + '): ' + data + '\n';
        // append entry to the current day's log
              if (type == 'warn') {
            // Warnings
              console.warn(colors.warn(msgLog));
          } else if (type == 'error') {
            // Errors
              console.error(colors.error(msgLog));
          } else {
            // All other logs will be in green
              console.log(colors.success(msgLog));
          }
        }
    }
 }
