module.exports = function (config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: ".",

    // list of files / patterns to load in the browser
    files: [
      "app/vendors/angular/angular.js",
      "app/vendors/angular-route/angular-route.js",
      "app/vendors/angular-mocks/angular-mocks.js",
      "app/vendors/jquery/dist/jquery.js",
      "app/vendors/bootstrap/js/modal.js",
      "app/vendors/lodash/lodash.js",
      "app/scripts/app.js",
      "app/scripts/controllers/*.js",
      {pattern: "test/**/*.js", watched: true, included: true, served: true}
    ],

    autoWatch: true,

    frameworks: ["mocha"],

    browsers: [
      "PhantomJS"
    ],

    plugins: ["karma-mocha"],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};