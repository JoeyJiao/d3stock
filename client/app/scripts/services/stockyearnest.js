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
    return function(data, key){
      return d3.nest()
        .key(key)
        .entries(data)
        .map(function(d){
          return {
              x: d.key,
              max: d3.max(d.values, function(x){ return +x.close; }),
              min: d3.min(d.values, function(x){ return +x.close; })
          };
        });
    }
  });
