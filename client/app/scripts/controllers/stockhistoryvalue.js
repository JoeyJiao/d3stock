'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:StockhistoryvalueCtrl
 * @description
 * # StockhistoryvalueCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('StockhistoryvalueCtrl', ['$scope', 'StockHttpLoader', 'StockHistoryValueParser', function ($scope, StockHttpLoader, StockHistoryValueParser) {
    $scope.stock = {
      url: '/api/stockhistorydata/',
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
                var data = StockHistoryValueParser(JSON.parse(response.data));
                $scope.stock.data = data;
            });

    }
  }]);
