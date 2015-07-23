'use strict';

/**
 * @ngdoc service
 * @name clientApp.StockHistoryValueParser
 * @description
 * # StockHistoryValueParser
 * Factory in the clientApp.
 */
angular.module('clientApp')
  .factory('StockHistoryValueParser', function () {
    return function(data) {
      var data = data.map(function(d){
        return {
          date: d.Date,
          y: +d.Close
        };
      });
      var parseDate = d3.time.format('%Y-%m-%d').parse;
      data.forEach(function(d){
          d.x = parseDate(d.date);
      });
      return data;
    };
  });
