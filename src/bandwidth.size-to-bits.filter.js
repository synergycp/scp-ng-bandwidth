(function () {
  'use strict';

  angular
    .module('scp.bandwidth')
    .filter('sizeToBits', sizeToBitsFactory)
    ;

  /**
   * @ngInject
   */
  function sizeToBitsFactory () {
    return function (size) {
      if(!size) return 0;

      var byteUnits = {
        '': 0,
        'K': 1,
        'M': 2,
        'G': 3,
        'T': 4,
        'P': 5,
        'E': 6,
        'Z': 7,
        'Y': 8
      }
      size = (size+'').trim().toUpperCase();

      if(size.substr(-2) == 'PS') {
        size = size.substr(size.length-2);
      }

      var unit = size.substr(-2, 1);
      unit = (size.substr(-1) != 'B' || !byteUnits[unit]) ? '' : unit;

      var count = parseFloat(size);
      var bits = Math.round(count*Math.pow(1000, byteUnits[unit])*8)

      return bits;
    };
  }
})();