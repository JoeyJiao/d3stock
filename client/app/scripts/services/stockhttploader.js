'use strict';

/**
 * @ngdoc service
 * @name clientApp.StockHttpLoader
 * @description
 * # StockHttpLoader
 * Factory in the clientApp.
 */
angular.module('clientApp')
  .factory('StockHttpLoader', ['$http', function ($http) {
    return function(url){
        console.info("Get " + url);
        return $http.get(url);
    };
  }]);
