var im = require('istanbul-middleware'),
  isCoverageEnabled = (process.env.COVERAGE == "true");
//before your code is require()-ed, hook the loader for coverage
//if (isCoverageEnabled) {
console.log('Hook loader for coverage - ensure this is not production!');
console.log(__dirname);
im.hookLoader(__dirname, { verbose: true });
// cover all files except under node_modules
// see API for other options
//}

require('./index');