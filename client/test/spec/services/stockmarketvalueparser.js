'use strict';

describe('Service: StockMarketValueParser', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var StockMarketValueParser;
  beforeEach(inject(function (_StockMarketValueParser_) {
    StockMarketValueParser = _StockMarketValueParser_;
  }));

  it('should do something', function () {
    expect(!!StockMarketValueParser).toBe(true);
  });

});
