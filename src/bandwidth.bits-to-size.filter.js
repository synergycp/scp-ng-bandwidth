(function () {
  'use strict';

  angular
    .module('scp.bandwidth')
    .filter('bitsToSize', bitsToSizeFactory)
  ;

  /**
   * @ngInject
   */
  function bitsToSizeFactory() {
    var byteUnits = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
    var precision = 0;

    return function (num) {
      var bytes = Math.max(num, 0) / 8;
      if (!bytes) {
        return '-';
      }

      var base = Math.log(bytes) / Math.log(1000);
      var pow = Math.max(
        Math.min(
          Math.floor(base),
          byteUnits.length - 1
        ), 0
      );

      return Math
          .pow(1000, base - pow)
          .toFixed(precision) + byteUnits[pow] + 'B';
    };
  }
})();
