'use strict';

describe('Controller: StockyearrangeCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var StockyearrangeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StockyearrangeCtrl = $controller('StockyearrangeCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(StockyearrangeCtrl.awesomeThings.length).toBe(3);
  });
});
