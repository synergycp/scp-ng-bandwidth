(function () {
  'use strict';

  var NODE = 'vendor/scp-ng-bandwidth/node_modules/';

  angular
    .module('scp.bandwidth')
    .config(lazyLoadConfig)
    ;

  /**
   * @ngInject
   */
  function lazyLoadConfig(APP_REQUIRES, _) {
    _.each([{
      name: 'numeral',
      files: [
        NODE+'numeral/min/numeral.min.js',
      ],
    }, {
      name: 'moment',
      files: [
        NODE+'moment/moment.js',
      ],
    }, {
      name: 'chart-js',
      files: [
        NODE+'chart.js/dist/Chart.min.js',
      ],
    }, {
      name: 'ng-chart-js',
      files: [
        NODE+'angular-chart.js/dist/angular-chart.min.js',
      ],
    }, {
      name: 'date-range-picker',
      files: [
        NODE+'bootstrap-daterangepicker/daterangepicker.js',
        NODE+'bootstrap-daterangepicker/daterangepicker.css',
        NODE+'angular-daterangepicker/js/angular-daterangepicker.js',
      ],
    }], Array.prototype.push.bind(APP_REQUIRES.modules));
  }
})();
