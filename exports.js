var Util = require('scp-ng-util');

module.exports = [
  Util
    .export('scp-ng-bandwidth', __dirname)
    .node([
      'numeral/min/numeral.min.js',
      'moment/moment.js',
      'chart.js/dist/Chart.min.js',
      'angular-chart.js/dist/angular-chart.min.js',
      'bootstrap-daterangepicker/daterangepicker.js',
      'bootstrap-daterangepicker/daterangepicker.css',
      'angular-daterangepicker/js/angular-daterangepicker.js',
    ])
    .static([
      'dist/**/*',
    ]),
];
