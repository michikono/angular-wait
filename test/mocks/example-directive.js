'use strict';

(function (window) {
  var angular = window.angular;
  angular
    .module('michiKono')
    .directive('exampleDirective', function () {
      return {
        restrict: 'E',
        replace: true,
        template: '<example-stub></example-stub>',
        controller: function ($scope) {
          $scope.exampleDirective.controller = true;
        },
        compile: function () {
          return {
            pre: function ($scope) {
              $scope.exampleDirective.pre = true;
            },
            post: function ($scope) {
              $scope.exampleDirective.post = true;
            }
          };
        }
      };
    });
}(window));
