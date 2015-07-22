'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:StockyearrangeCtrl
 * @description
 * # StockyearrangeCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('StockyearrangeCtrl', ['$scope', 'StockHttpLoader', 'StockYearNest', function ($scope, StockHttpLoader, StockYearNest) {
    $scope.stock = {
      url: '/api/stockyearrange/',
      data: '',
      code: '',
      pattern: /^[0-9]{6}$/
    };

    $scope.$watch('stock.code', function(newValue, oldValue, scope){
        if($scope.stock.code !== undefined && $scope.stock.code !== ""){
            load($scope.stock.code);
        } else {
            $scope.stock.data = "";
        }
    });

    function load(code){
        StockHttpLoader($scope.stock.url + code)
            .then(function(response){
                console.info("Got data from " + $scope.stock.url + code);
                var data = StockYearNest(JSON.parse(response.data), function(d){
                    return (new Date(d.Date)).getFullYear();
                });
                $scope.stock.data = data;
            });

    }
  }]);
