'use strict';

/**
 * @ngdoc service
 * @name clientApp.StockMarketValueParser
 * @description
 * # StockMarketValueParser
 * Factory in the clientApp.
 */
angular.module('clientApp')
  .factory('StockMarketValueParser', function () {
    return function(data) {
      var data = data.map(function(d){
        return {
          date: d.date,
          y: +d.close * +d.equity / 10000
        };
      });
      var parseDate = d3.time.format('%Y-%m-%d %H:%M:%S.%L').parse;
      data.forEach(function(d){
          d.x = parseDate(d.date);
      });
      return data;
    };
  });
