'use strict';

describe('Service: OcupationService', function () {

  // load the service's module
  beforeEach(module('costasGiswebApp'));

  // instantiate service
  var OcupationService;
  beforeEach(inject(function (_OcupationService_) {
    OcupationService = _OcupationService_;
  }));

  it('should do something', function () {
    expect(!!OcupationService).toBe(true);
  });

});
