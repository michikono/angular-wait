'use strict';

describe('Directive: wait', function () {
  // load the directive's module
  beforeEach(module('michiKono'));

  var element,
    $scope,
    $rootScope,
    $compile,
    $templateCache;

  var doDirective = function (html, $compile) {
    element = angular.element(html);
    var compiled = $compile(element)($scope);
    compiled.scope().$digest();
    return element;
  };

  beforeEach(inject(function (_$compile_, _$rootScope_, _$templateCache_) {
    $rootScope = _$rootScope_;
    $compile = _$compile_;
    $templateCache = _$templateCache_;
    $scope = $rootScope.$new();
  }));

  describe('attribute until-not-false', function () {
    it('should show "<span>noise</span><span>LOADING</span>" while initially waiting and hide wait-done contents', inject(function ($compile) {
      element = doDirective('<wait until-not-false="false"><wait-loading><span>noise</span><span>LOADING</span></wait-loading><wait-done><span>noise</span><span>DONE</span></wait-done></wait>', $compile);
      expect(element.html().replace(/ class="ng-scope"/g, '')).toMatch(/><span>noise<\/span><span>LOADING<\/span></);
      expect(element.html().replace(/ class="ng-scope"/g, '')).not.toMatch(/><span>noise<\/span><span>DONE<\/span></);
    }));

    it('should show wait-done contents when until conditional met AND hide wait-loading', inject(function ($compile) {
      element = doDirective('<wait until-not-false="\'\'"><wait-loading><span>noise</span><span>LOADING</span></wait-loading><wait-done><span>noise</span><span>DONE</span></wait-done></wait>', $compile);
      expect(element.html().replace(/ class="ng-scope"/g, '')).not.toMatch(/><span>noise<\/span><span>LOADING<\/span></);
      expect(element.html().replace(/ class="ng-scope"/g, '')).toMatch(/><span>noise<\/span><span>DONE<\/span></);
    }));

    it('should show nothing if no done node provided', inject(function ($compile) {
      element = doDirective('<wait until-not-false="\'\'"><wait-loading><span>noise</span><span>LOADING</span></wait-loading></wait>', $compile);
      expect(element.html().replace(/ class="ng-scope"/g, '')).not.toMatch(/><span>noise<\/span><span>LOADING<\/span></);
    }));

    it('should respect changes to $scope and show wait-done contents when until conditional met AND hide wait-loading', inject(function ($compile) {
      $scope.testVal = false;
      element = doDirective('<wait until-not-false="testVal"><wait-loading><span>noise</span><span>LOADING</span></wait-loading><wait-done><span>noise</span><span>DONE</span></wait-done></wait>', $compile);
      expect(element.html().replace(/ class="ng-scope"/g, '')).toMatch(/><span>noise<\/span><span>LOADING<\/span></);
      expect(element.html().replace(/ class="ng-scope"/g, '')).not.toMatch(/><span>noise<\/span><span>DONE<\/span></);

      $scope.testVal = null; // using a falsey value to ensure === tests are being used
      $scope.$digest();
      expect(element.html().replace(/ class="ng-scope"/g, '')).not.toMatch(/><span>noise<\/span><span>LOADING<\/span></);
      expect(element.html().replace(/ class="ng-scope"/g, '')).toMatch(/><span>noise<\/span><span>DONE<\/span></);
    }));
  });

  describe('attribute until-not-null', function () {
    it('should show "<span>noise</span><span>LOADING</span>" while initially waiting and hide wait-done contents', inject(function ($compile) {
      element = doDirective('<wait until-not-null="null"><wait-loading><span>noise</span><span>LOADING</span></wait-loading><wait-done><span>noise</span><span>DONE</span></wait-done></wait>', $compile);
      expect(element.html().replace(/ class="ng-scope"/g, '')).toMatch(/><span>noise<\/span><span>LOADING<\/span></);
      expect(element.html().replace(/ class="ng-scope"/g, '')).not.toMatch(/><span>noise<\/span><span>DONE<\/span></);
    }));

    it('should show wait-done contents when until conditional met AND hide wait-loading', inject(function ($compile) {
      element = doDirective('<wait until-not-null="\'\'"><wait-loading><span>noise</span><span>LOADING</span></wait-loading><wait-done><span>noise</span><span>DONE</span></wait-done></wait>', $compile);
      expect(element.html().replace(/ class="ng-scope"/g, '')).not.toMatch(/><span>noise<\/span><span>LOADING<\/span></);
      expect(element.html().replace(/ class="ng-scope"/g, '')).toMatch(/><span>noise<\/span><span>DONE<\/span></);
    }));

    it('should show nothing if no done node provided', inject(function ($compile) {
      element = doDirective('<wait until-not-null="\'\'"><wait-loading><span>noise<\/span><span>LOADING<\/span></wait-loading></wait>', $compile);
      expect(element.html().replace(/ class="ng-scope"/g, '')).not.toMatch(/><span>noise<\/span><span>LOADING<\/span></);
    }));

    it('should respect changes to $scope and show wait-done contents when until conditional met AND hide wait-loading', inject(function ($compile) {
      $scope.testVal = null;
      element = doDirective('<wait until-not-null="testVal"><wait-loading><span>noise</span><span>LOADING</span></wait-loading><wait-done><span>noise</span><span>DONE</span></wait-done></wait>', $compile);
      expect(element.html().replace(/ class="ng-scope"/g, '')).toMatch(/><span>noise<\/span><span>LOADING<\/span></);
      expect(element.html().replace(/ class="ng-scope"/g, '')).not.toMatch(/><span>noise<\/span><span>DONE<\/span></);

      $scope.testVal = false; // using a falsey value to ensure === tests are being used
      $scope.$digest();
      expect(element.html().replace(/ class="ng-scope"/g, '')).not.toMatch(/><span>noise<\/span><span>LOADING<\/span></);
      expect(element.html().replace(/ class="ng-scope"/g, '')).toMatch(/><span>noise<\/span><span>DONE<\/span></);
    }));
  });

  describe('attribute until-not-undefined', function () {
    it('should show "<span>noise</span><span>LOADING</span>" while initially waiting and hide wait-done contents', inject(function ($compile) {
      element = doDirective('<wait until-not-undefined="undefinedVar"><wait-loading><span>noise</span><span>LOADING</span></wait-loading><wait-done><span>noise</span><span>DONE</span></wait-done></wait>', $compile);
      expect(element.html().replace(/ class="ng-scope"/g, '')).toMatch(/><span>noise<\/span><span>LOADING<\/span></);
      expect(element.html().replace(/ class="ng-scope"/g, '')).not.toMatch(/><span>noise<\/span><span>DONE<\/span></);
    }));

    it('should show wait-done contents when until conditional met AND hide wait-loading', inject(function ($compile) {
      element = doDirective('<wait until-not-undefined="\'\'"><wait-loading><span>noise</span><span>LOADING</span></wait-loading><wait-done><span>noise</span><span>DONE</span></wait-done></wait>', $compile);
      expect(element.html().replace(/ class="ng-scope"/g, '')).not.toMatch(/><span>noise<\/span><span>LOADING<\/span></);
      expect(element.html().replace(/ class="ng-scope"/g, '')).toMatch(/><span>noise<\/span><span>DONE<\/span></);
    }));

    it('should show nothing if no done node provided', inject(function ($compile) {
      element = doDirective('<wait until-not-undefined="\'\'"><wait-loading><span>noise</span><span>LOADING</span></wait-loading></wait>', $compile);
      expect(element.html().replace(/ class="ng-scope"/g, '')).not.toMatch(/><span>noise<\/span><span>LOADING<\/span></);
    }));

    it('should respect changes to $scope and show wait-done contents when until conditional met AND hide wait-loading', inject(function ($compile) {
      element = doDirective('<wait until-not-undefined="testVal"><wait-loading><span>noise</span><span>LOADING</span></wait-loading><wait-done><span>noise</span><span>DONE</span></wait-done></wait>', $compile);
      expect(element.html().replace(/ class="ng-scope"/g, '')).toMatch(/><span>noise<\/span><span>LOADING<\/span></);
      expect(element.html().replace(/ class="ng-scope"/g, '')).not.toMatch(/><span>noise<\/span><span>DONE<\/span></);

      $scope.testVal = false; // using a falsey value to ensure === tests are being used
      $scope.$digest();
      expect(element.html().replace(/ class="ng-scope"/g, '')).not.toMatch(/><span>noise<\/span><span>LOADING<\/span></);
      expect(element.html().replace(/ class="ng-scope"/g, '')).toMatch(/><span>noise<\/span><span>DONE<\/span></);
    }));
  });

  describe('render order', function() {
    it('should not process inner scope changes or directives until done condition met', inject(function ($compile) {
      $scope.doNotRender = null;
      element = doDirective('<wait until-not-null="null"><wait-loading></wait-loading><wait-done><span ng-init="doNotRender = \'value\'"></span></wait-done></wait>', $compile);
      $scope.$digest();
      expect($scope.doNotRender).toBeNull();
    }));

    it('should process inner scope changes when done condition met', inject(function ($compile) {
      $scope.doNotRender = null;
      element = doDirective('<wait until-not-null="true"><wait-loading></wait-loading><wait-done><span ng-init="doNotRender = \'value\'"></span></wait-done></wait>', $compile);
      $scope.$digest();
      expect($scope.doNotRender).toEqual('value');
    }));

    it('should run controller and compile methods of inner directives when done condition met', inject(function ($compile) {
      $scope.exampleDirective = {};
      element = doDirective('<wait until-not-null="true"><wait-loading></wait-loading><wait-done><example-directive></example-directive></wait-done></wait>', $compile);
      $scope.$digest();
      expect($scope.exampleDirective.controller).toBe(true);
      expect($scope.exampleDirective.pre).toBe(true);
      expect($scope.exampleDirective.post).toBe(true);
      expect(element.html().replace(/ class="ng-scope"/g, '')).toMatch(/<example-stub><\/example-stub>/);
    }));

    it('should not run controller and compile methods of inner directives until done condition met', inject(function ($compile) {
      $scope.exampleDirective = {};
      element = doDirective('<wait until-not-null="null"><wait-loading></wait-loading><wait-done><example-directive></example-directive></wait-done></wait>', $compile);
      $scope.$digest();
      expect($scope.exampleDirective.compile).not.toBeDefined();
      expect($scope.exampleDirective.controller).not.toBeDefined();
      expect($scope.exampleDirective.pre).not.toBeDefined();
      expect($scope.exampleDirective.post).not.toBeDefined();
      expect(element.html().replace(/ class="ng-scope"/g, '')).not.toMatch(/<example-directive><\/example-directive>/);
    }));
  });
});
