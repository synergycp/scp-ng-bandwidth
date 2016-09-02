(function () {
  'use strict';

  angular
    .module('scp.bandwidth')
    .factory('BandwidthState', BandwidthStateFactory);

  /**
   * BandwidthState Factory
   *
   * @ngInject
   */
  function BandwidthStateFactory (Loader) {
    return function () {
        return new BandwidthState(
          Loader()
        );
    };
  }

  function BandwidthState (loader) {
    var state = this;

    state.loader = loader;
    state.fullScreen = false;

    //////////


  }
})();
