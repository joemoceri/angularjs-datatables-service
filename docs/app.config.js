'use strict';

angular.
  module('exampleApp').
  config(['$routeProvider',
    function config($routeProvider) {
        $routeProvider.
            when('/example', {
              template: '<example></example>'
          }).
            otherwise('/example');
    }
  ]);
