'use strict';

describe('Service: StockHttpLoader', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var StockHttpLoader;
  beforeEach(inject(function (_StockHttpLoader_) {
    StockHttpLoader = _StockHttpLoader_;
  }));

  it('should do something', function () {
    expect(!!StockHttpLoader).toBe(true);
  });

});
