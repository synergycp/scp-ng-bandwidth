(function () {
  'use strict';

  angular
    .module('scp.bandwidth')
    .controller('BandwidthGraphCtrl', BandwidthGraphCtrl)
    ;

  /**
   * BandwidthGraph Controller
   *
   * @ngInject
   */
  function BandwidthGraphCtrl() {
    var vm = this;

    vm.$onInit = activate;

    //////////

    function activate() {
      
    }
  }
})();
