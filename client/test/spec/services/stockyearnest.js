'use strict';

describe('Service: StockYearNest', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var StockYearNest;
  beforeEach(inject(function (_StockYearNest_) {
    StockYearNest = _StockYearNest_;
  }));

  it('should do something', function () {
    expect(!!StockYearNest).toBe(true);
  });

});
