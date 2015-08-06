'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:StockfenjiCtrl
 * @description
 * # StockfenjiCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('StockfenjiCtrl', ['$scope', 'StockHttpLoader', function ($scope, StockHttpLoader) {
    $scope.stock = {
      url_a: '/api/stockfenjidata/funda_list',
      url_b: '/api/stockfenjidata/fundb_list',
      url_m: '/api/stockfenjidata/fundm_list',
      data: {
          a: '',
          b: '',
          m: ''
      }
    };

    function load(){
        StockHttpLoader($scope.stock.url_a)
            .then(function(response){
                console.info("Got data from " + $scope.stock.url_a);
                $scope.stock.data.a = JSON.parse(response.data);
          //      $scope.stock.data = response.data;
            });
        StockHttpLoader($scope.stock.url_b)
            .then(function(response){
                console.info("Got data from " + $scope.stock.url_b);
                $scope.stock.data.b = JSON.parse(response.data);
          //      $scope.stock.data = response.data;
            });
        StockHttpLoader($scope.stock.url_m)
            .then(function(response){
                console.info("Got data from " + $scope.stock.url_m);
                $scope.stock.data.m = JSON.parse(response.data);
          //      $scope.stock.data = response.data;
            });

    }

    load();
  }]);
