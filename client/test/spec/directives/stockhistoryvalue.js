'use strict';

describe('Directive: stockHistoryValue', function () {

  // load the directive's module
  beforeEach(module('clientApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-stock-history-value></-stock-history-value>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the stockHistoryValue directive');
  }));
});
