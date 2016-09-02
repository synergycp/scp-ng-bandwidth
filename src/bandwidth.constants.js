(function () {
  'use strict';

  angular
    .module('scp.bandwidth')
    .factory('moment', momentFactory)
    .factory('numeral', numeralFactory)
    ;

  /**
   * @ngInject
   */
  function momentFactory($window) {
    return $window.moment;
  }

  /**
   * @ngInject
   */
  function numeralFactory($window) {
    return $window.numeral;
  }

})();
