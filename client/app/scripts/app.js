'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/stockyearrange', {
        templateUrl: 'views/stockyearrange.html',
        controller: 'StockyearrangeCtrl',
        controllerAs: 'stockyearrange'
      })
      .when('/stockhistoryvalue', {
        templateUrl: 'views/stockhistoryvalue.html',
        controller: 'StockhistoryvalueCtrl',
        controllerAs: 'stockhistoryvalue'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
