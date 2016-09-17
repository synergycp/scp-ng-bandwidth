(function () {
  'use strict';

  angular
    .module('scp.bandwidth.picker')
    .component('bandwidthDateRangePicker', {
      require: {
      },
      bindings: {
        bandwidth: '=',
      },
      controller: 'BandwidthDateRangePickerCtrl as picker',
      transclude: true,
      templateUrl: templateUrl,
    })
    .controller('BandwidthDateRangePickerCtrl', BandwidthDateRangePickerCtrl)
    ;

  /**
   * @ngInject
   */
  function templateUrl(RouteHelpers) {
    return RouteHelpers
      .export('scp-ng-bandwidth')
      .root('dist')
      .path('picker/picker.html')
      ;
  }

  /**
   * @ngInject
   */
  function BandwidthDateRangePickerCtrl($element) {
    var picker = this;

    picker.$onInit = init;
    picker.openFilter = openFilter;

    //////////

    function init() {
    }

    function openFilter() {
      $('.date-picker', $element[0]).click();
    }
  }
})();
