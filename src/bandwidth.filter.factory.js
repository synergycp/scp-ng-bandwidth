(function () {
  'use strict';

  var OPTIONS = {
    refresh: function () {},
  };

  var dateFormat = 'MM/DD/YYYY HH:mm';
  var minMaxFormat = 'YYYY-MM-DD HH:mm';

  angular
    .module('scp.bandwidth')
    .factory('BandwidthFilter', BandwidthFilterFactory)
    ;

  /**
   * BandwidthFilter Factory
   *
   * @ngInject
   */
  function BandwidthFilterFactory(moment, date, EventEmitter, _) {
    return function (options) {
      return new BandwidthFilter(
        _.assign({}, OPTIONS, options || {}),
        moment,
        EventEmitter(),
        date,
        _
      );
    };
  }

  function BandwidthFilter(options, moment, event, date, _) {
    var filter = this;
    var intendedMaxTime;
    var thirtyMinutes = moment.duration(30, 'minutes');
    var nowRounded = date.round(
      moment(),
      thirtyMinutes,
      'ceil'
    );
    var lastHour = date.round(
      moment().subtract(1, 'hours'),
      thirtyMinutes,
      'floor'
    );
    var ranges = {
      'Last Hour': [lastHour, nowRounded],
      'Last 6 Hours': [
        moment(nowRounded).subtract(6, 'hours'),
        nowRounded
      ],
      'Last Day': [
        moment(nowRounded).subtract(1, 'day'),
        nowRounded
      ],
      'Last Week': [
        moment(nowRounded).subtract(1, 'week'),
        nowRounded
      ],
      'Last Month': [
        moment(nowRounded).subtract(1, 'month'),
        nowRounded
      ]
    };


    filter.input = {};

    filter.setOptions = setOptions;
    filter.setRange = setRange;
    filter.setMinTime = setMinTime;
    filter.setMaxTime = setMaxTime;
    filter.startTime = startTime;
    filter.endTime = endTime;
    filter.getRanges = getRanges;
    filter.getLabel = getLabel;
    filter.setRangeByLabel = setRangeByLabel;
    filter.jumpToLatest = jumpToLatest;

    activate();

    //////////

    function jumpToLatest() {
      var max = moment.unix(intendedMaxTime).subtract(1);
      var diff = filter.end.diff(filter.start);
      filter.setRange(
        moment(max).subtract(diff),
        max
      );
      filter.setMaxTime(intendedMaxTime);
    }

    function setOptions(options) {
      _.assign(filter.opts, options);

      return filter;
    }

    function setRangeByLabel(label) {
      if (filter.range === label) {
        return;
      }

      filter.range = label;
      filter.setRange(
        defaultStartTime(label),
        defaultEndTime(label)
      );
    }

    function activate() {
      filter.options = options;
      filter.isSetup = false;
      filter.min = undefined;
      filter.setMaxTime(
        moment(nowRounded)
          .add(5, 'minutes')
          .unix()
      );

      filter.opts = {
        ranges: ranges,
        format: dateFormat,
        timePicker: true,
        timePicker24Hour: true,
        eventHandlers: {
          'apply.daterangepicker': onDateChosen,
        },
      };

      event.bindTo(filter);
      filter.on('change', setRangeLabel);
    }

    function onDateChosen () {
      filter.setRange(
        filter.input.startDate,
        filter.input.endDate
      );
    }

    function setRangeLabel() {
      filter.range = filter.getLabel();
    }

    /**
     * Set the date of the date range picker.
     *
     * @param {moment} start
     * @param {moment} end
     * @param {string|null} label
     */
    function setRange(start, end) {
      filter.fire(
        'change',
        setStart(start),
        setEnd(end)
      );
    }

    function setEnd(end) {
      filter.end = moment(end);
      filter.input.endDate = filter.end.format(minMaxFormat);

      return filter.end;
    }

    function setStart(start) {
      filter.start = moment(start);
      filter.input.startDate = filter.start.format(minMaxFormat);

      return filter.start;
    }

    /**
     * @param {int} minTime
     *
     * @return {this}
     */
    function setMinTime(minTime) {
      filter.min = minTime ? moment.unix(minTime).format(minMaxFormat) : undefined;

      return filter;
    }

    /**
     * @param {int} minTime
     *
     * @return {this}
     */
    function setMaxTime(maxTime) {
      intendedMaxTime = maxTime;
      if (!maxTime) {
        filter.max = undefined;
        return;
      }

      var max = moment.unix(maxTime);

      if (max.isBefore(filter.end)) {
        max = moment(filter.end);
      }

      filter.max = max.format(minMaxFormat);

      return filter;
    }

    /**
     * Get the currently selected start time.
     *
     * @return {moment|null}
     */
    function startTime() {
      return filter.start;
    }

    /**
     * Get the currently selected end time.
     *
     * @return {moment|null}
     */
    function endTime() {
      return filter.end;
    }

    /**
     * Get the default selected start time.
     *
     * @param {string} label
     *
     * @return {moment|null}
     */
    function defaultStartTime(label) {
      return filter.getRanges()[label][0];
    }

    /**
     * Get the default selected end time.
     *
     * @param {string} label
     *
     * @return {moment|null}
     */
    function defaultEndTime(label) {
      return filter.getRanges()[label][1];
    }

    /**
     * Get the datepicker ranges
     *
     * @return {object}
     */
    function getRanges() {
      return ranges;
    }

    function getLabel() {
      var didFind = _.find(filter.getRanges(), function (range, label) {
        if (!matchesInput(range)) {
          return;
        }

        filter.range = label;
        return true;
      });

      if (!didFind) {
        filter.range = makeLabel();
      }

      return filter.range;

      function matchesInput(range) {
        // This doesn't work because of min and max dates.
        return range[0].isSame(filter.start) &&
               range[1].isSame(filter.end);
      }
    }

    function makeLabel() {
      return filter.start.format('M/DD HH:mm') +
             ' - ' +
             filter.end.format('M/DD HH:mm')
             ;
    }
  }
})();
