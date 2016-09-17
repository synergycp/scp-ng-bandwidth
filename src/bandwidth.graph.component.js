(function () {
  'use strict';

  angular
    .module('scp.bandwidth')
    .component('bandwidthGraph', {
      require: {
      },
      bindings: {
        target: '=',
        filter: '=',
        state: '=',
        chart: '=',
        type: '@',
      },
      controller: 'BandwidthGraphCtrl as bandwidth',
      transclude: true,
      templateUrl: templateUrl,
    })
    ;

  /**
   * @ngInject
   */
  function templateUrl(RouteHelpers) {
    return RouteHelpers
      .export('scp-ng-bandwidth')
      .root('dist')
      .path('bandwidth.graph.html')
      ;
  }
})();
