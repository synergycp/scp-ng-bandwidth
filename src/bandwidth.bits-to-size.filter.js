(function () {
  'use strict';

  angular
    .module('scp.bandwidth')
    .filter('bitsToSize', bitsToSizeFactory)
    ;

  /**
   * @ngInject
   */
  function bitsToSizeFactory (numeral) {
    return function (num) {
      return numeral(num*1.1).format('0,0b');
    };
  }
})();
