'use strict';

/**
 * @ngdoc service
 * @name clientApp.StockHttpLoader
 * @description
 * # StockHttpLoader
 * Factory in the clientApp.
 */
angular.module('clientApp')
  .factory('StockHttpLoader', function () {
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
