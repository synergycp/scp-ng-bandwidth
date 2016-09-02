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
      templateUrl: 'scp/bandwidth/bandwidth.graph.html',
    })
    ;
})();
