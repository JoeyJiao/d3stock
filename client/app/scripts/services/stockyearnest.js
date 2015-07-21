'use strict';

/**
 * @ngdoc service
 * @name clientApp.StockYearNest
 * @description
 * # StockYearNest
 * Factory in the clientApp.
 */
angular.module('clientApp')
  .factory('StockYearNest', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
