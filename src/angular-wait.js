/**
 * angular-wait version 1.0.2
 * License: MIT.
 * Copyright (C) 2014 Michi Kono
 * https://github.com/michikono/angular-wait
 */

'use strict';

(function (window) {
  var angular = window.angular;
  angular
    .module('michiKono', [])
    .controller('waitDirectiveCtrl', function WaitDirectiveCtrl($scope, $element) {
      $scope.show = false;
      var childScopes = [];

      var updateChildren = function () {
        for (var i = 0; i < childScopes.length; i++) {
          childScopes[i].show = $scope.show;
        }
      };
      this.registerChild = function (scope) {
        childScopes.push(scope);
        updateChildren();
      };

      $scope.$watch('untilNotNull', function (newValues, oldValues, scope) {
        if (typeof newValues !== 'undefined' && newValues !== null) {
          $scope.show = true;
          updateChildren();
        }
      });
      $scope.$watch('untilNotFalse', function (newValues, oldValues, scope) {
        if (typeof newValues !== 'undefined' && newValues !== false) {
          $scope.show = true;
          updateChildren();
        }
      });
      $scope.$watch('untilNotUndefined', function (newValues, oldValues, scope) {
        if (typeof newValues !== 'undefined') {
          $scope.show = true;
          updateChildren();
        }
      });
    })
    .directive('wait', function () {
      return {
        controller: 'waitDirectiveCtrl',
        restrict: 'AE',
        scope: {
          // these assume "when no longer undefined and..."
          untilNotNull: '=',
          untilNotFalse: '=',
          untilNotUndefined: '='
        },
        link: function postLink(scope, element, attrs) {
        }
      };
    })
    .directive('waitLoading', function () {
      return {
        restrict: 'EA',
        replace: true,
        template: '<span ng-transclude></span>',
        transclude: true,
        require: '^wait',
        link: function link(scope, $element, attrs, controller, transclude) {
          scope.$watch('show', function (contents, old) {
            $element.html('');
            if (!contents) {
              transclude(scope, function (clone) {
                $element.html('');
                $element.append(clone);
              });
            }
          });
          // why we need something like this: http://stackoverflow.com/questions/16866749/access-parent-scope-in-transcluded-directive
          controller.registerChild(scope);
        }
      };
    })
    .directive('waitDone', function () {
      return {
        priority: 1,
        terminal: true,
        restrict: 'EA',
        replace: true,
        template: '<span ng-transclude></span>',
        transclude: true,
        scope: false,
        require: '^wait',
        link: function link(scope, $element, attrs, controller, transclude) {
          scope.$watch('show', function (contents, old) {
            $element.html('');
            if (contents) {
              transclude(scope, function (clone) {
                $element.html('');
                $element.append(clone);
              });
            }
          });
          controller.registerChild(scope);
        }
      };
    });
}(window));
