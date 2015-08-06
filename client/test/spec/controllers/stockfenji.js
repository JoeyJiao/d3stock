'use strict';

describe('Controller: StockfenjiCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var StockfenjiCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StockfenjiCtrl = $controller('StockfenjiCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(StockfenjiCtrl.awesomeThings.length).toBe(3);
  });
});
