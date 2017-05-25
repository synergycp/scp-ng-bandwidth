(function () {
  'use strict';

  angular
    .module('scp.bandwidth')
    .filter('bitsToSize', bitsToSizeFactory)
    ;

  /**
   * @ngInject
   */
  function bitsToSizeFactory () {
    return function (num, exp) {
      num=num/8;if(0==num)return"0 Bytes";var c=1e3,d=exp||2,e=["","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(num)/Math.log(c));return parseFloat((num/Math.pow(c,f)).toFixed(d))+e[f];
    };
  }
})();
