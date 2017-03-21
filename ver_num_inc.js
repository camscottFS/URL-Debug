// Requires
const packjson = require('./package.json');
const fs = require('fs');

// Store arguments, package.json version and argument number
var argv = require('yargs').argv;
var version = packjson.version.split('.');
var number = argv.n;

// If statement to evaluate argument are passed and correct
if ((argv.v === 'major' || argv.v === 'minor' || argv.v === 'patch') && typeof argv.n === 'number') {
  if (argv.v === 'major') {
    version[0] = number;
  } else if (argv.v === 'minor') {
    version[1] = number;
  } else if (argv.v === 'patch') {
    version[2] = number;
  }

// Store and write new version
  packjson.version = version.join('.');
  fs.writeFile('./package.json', JSON.stringify(packjson, null, 4), (err) => {
    if (err) {
      return console.log(err);
    }
    // Success message
    console.log(argv.v + ' has been updated to ' + argv.n);
  });
} else {
  // error messege
  console.log('Please verify your arguments.')
}