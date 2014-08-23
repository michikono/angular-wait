# Overview

This Angular directive enables a "loading" view while performing asynchronous requests. The directive watches a specific value you may be 
interested in. For example, your controller:

```js
angular.module('your app')
  .controller('ExampleCtrl', function ($scope, $timeout) {
    $timeout(function() {
        $scope.myAsyncValue = 'hello from the server'; 
    }, 2000)
  });
```

And in your view:

```html
    <wait until-not-undefined="myAsyncValue">
      <wait-loading>loading...</wait-loading>
      <wait-done>{{myAsyncValue}}</wait-done>
    </wait>
```

Here's what would happen:

1. "Loading" would initially appear
2. Two seconds later, "hello from the server" would show

## Why is this better than ng-if="variableName"?

This directive helps remove potentially complex condition checking from the view since standard falsey checks in the view
can't always distinguish between incomplete requests and empty responses. This illustrates the example better; see this 
controller:

```js
angular.module('your app')
  .controller('ExampleCtrl', function ($scope, $timeout) {
    $timeout(function() {
      $scope.myAsyncValue = null; 
    }, 2000)
  });
```

And in your view:

```html
<wait until-not-undefined="myAsyncValue">
  <wait-loading>loading...</wait-loading>
  <wait-done>
    <div ng-if="myAsyncValue">{{myAsyncValue}}</div>
    <div ng-if="!myAsyncValue">No result</wait-done>
</wait>
```

This would yield:

1. "Loading" would initially appear
2. Two seconds later, "No result" would show

# Requirements

Tested in IE8+, latest Chrome, and latest Safari. Angular 1.2+. 

# Installing

```shell
bower install -S angular-wait
```

Make sure to use the files from the `dist/` folder. Then Integrate into your app:

```js
var myapp = angular.module('myapp', ['michiKono']);
```

# Usage

Simply define the `wait` directive with `wait-loading` (mandatory) and `wait-done` nodes inside it as shown below:

```html
<wait until-not-false="someVariable">
  <wait-loading>shown while waiting</wait-loading>
  <wait-done>shown when finished</wait-done>
</wait>
 
<wait until-not-null="someVariable">
  <wait-loading>shown while waiting</wait-loading>
  <wait-done>shown when finished</wait-done>
</wait>

<wait until-not-undefined="someVariable">
  <wait-loading>shown while waiting</wait-loading>
  <wait-done>shown when finished</wait-done>
</wait>
```

## Wait Until _____

All three available attributes to the directive watch the passed condition or variable until its value matches
the asked state. For example the following uses all immediately render the `wait-done` nodes:

```html
<wait until-not-null="null">
  <wait-loading>not shown</wait-loading>
  <wait-done>SHOWS IMMEDIATELY</wait-done>
</wait>
 
<wait until-not-false="false">
  <wait-loading>not shown</wait-loading>
  <wait-done>SHOWS IMMEDIATELY</wait-done>
</wait>

<wait until-not-undefined="1">
  <wait-loading>not shown</wait-loading>
  <wait-done>SHOWS IMMEDIATELY</wait-done>
</wait>
```
    
Note that the matching is using triple equals (`===`). This means that falsey values for the `until-not-null` do not 
necessarily trigger it. The following example illustrates this:

```html
<wait until-not-null="false">
  <wait-loading>SHOWN</wait-loading>
  <wait-done>not shown</wait-done>
</wait>
 
<wait until-not-false="null">
  <wait-loading>SHOWN</wait-loading>
  <wait-done>not shown</wait-done>
</wait>

<wait until-not-undefined="false">
  <wait-loading>SHOWN</wait-loading>
  <wait-done>not shown</wait-done>
</wait>
```
    
Lastly, it probably goes without saying that the inner contents are using transclusion and are not rendered (and, thus, processed) 
until the `until-` condition is met.