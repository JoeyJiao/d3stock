'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:StockYearRange
 * @description
 * # StockYearRange
 */
angular.module('clientApp')
  .directive('StockYearRange', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the StockYearRange directive');
      }
    };
  });
