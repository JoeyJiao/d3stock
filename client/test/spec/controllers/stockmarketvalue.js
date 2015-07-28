'use strict';

describe('Controller: StockmarketvalueCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var StockmarketvalueCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StockmarketvalueCtrl = $controller('StockmarketvalueCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(StockmarketvalueCtrl.awesomeThings.length).toBe(3);
  });
});
