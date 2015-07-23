'use strict';

describe('Service: StockHistoryValueParser', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var StockHistoryValueParser;
  beforeEach(inject(function (_StockHistoryValueParser_) {
    StockHistoryValueParser = _StockHistoryValueParser_;
  }));

  it('should do something', function () {
    expect(!!StockHistoryValueParser).toBe(true);
  });

});
