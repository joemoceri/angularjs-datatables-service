'use strict';

describe('example', function() {

  beforeEach(module('example'));

  // Test the controller
  describe('ExampleController', function() {
    var $httpBackend, ctrl;

    beforeEach(inject(function($componentController, _$httpBackend_) {
      $httpBackend = _$httpBackend_;

      ctrl = $componentController('example');
    }));

  });

});
