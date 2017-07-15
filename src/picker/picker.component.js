(function () {
  'use strict';

  var SHIFTS = [
    {
      label: '5 minutes',
      value: [5, 'minutes']
    }, {
      label: '30 minutes',
      value: [30, 'minutes']
    }, {
      label: '2 hours',
      value: [2, 'hours']
    }, {
      label: '6 hours',
      value: [6, 'hours']
    }, {
      label: '1 day',
      value: [1, 'day']
    }
  ]

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
  function BandwidthDateRangePickerCtrl($element, $timeout, moment) {
    var picker = this;

    picker.$onInit = init;
    picker.openFilter = openFilter;
    picker.changeRange = changeRange;
    picker.selected = null;
    picker.rangeShifts = _.clone(SHIFTS);
    picker.selectedRangeShift = picker.rangeShifts[0];

    //////////

    function init() {
    }

    function openFilter($event) {
      picker.bandwidth.filter.updateRanges();
      var $elem = $picker();

      if ($event.target === $elem[0]) {
        return;
      }

      $timeout(
        $elem.click.bind($elem)
      );
    }

    function $picker() {
      return $('.date-picker', $element[0]);
    }

    function changeRange(incOrDec, value) {
      var start = moment(picker.bandwidth.filter.start);
      var end = moment(picker.bandwidth.filter.end);
      var method = (incOrDec == 'inc' && 'add') || (incOrDec == 'dec' && 'subtract');
      var newStart = start[method](value[0], value[1]);
      var newEnd = end[method](value[0], value[1]);
      picker.bandwidth.filter.setRange(newStart, newEnd)
    }
  }
})();
