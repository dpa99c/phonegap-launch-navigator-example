// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

  });
})

// Use the classic cordova plugin callback syntax to invoke launchnavigator
.controller('classicController', function($scope) {
    $scope.navigate = function(){

      var isRealDevice = ionic.Platform.isWebView();
      if(!isRealDevice){
        alert("launchnavigator will only work on a real mobile device! It is a NATIVE app launcher.");
        return;
      }

      try{
        launchnavigator.navigate(
          "London, UK",
          "Manchester, UK",
          function(){
            alert("Plugin success");
          },
          function(error){
            alert("Plugin error: "+ error);
          },
          {
            navigationMode: "maps"
          }
        );
      }catch(e){
        alert("Exception: "+e.message);
      }
    }
})

// Define an Angular service to wrap the plugin
  .service('$cordovaLaunchNavigator', ['$q', function($q) {
  "use strict";

  var $cordovaLaunchNavigator = {};
  $cordovaLaunchNavigator.navigate = function(destination, start, options) {
    var q = $q.defer(),
      isRealDevice = ionic.Platform.isWebView();

    if(!isRealDevice){
      q.reject("launchnavigator will only work on a real mobile device! It is a NATIVE app launcher.");
    }else{
      try{
        launchnavigator.navigate(destination, start, function () {
          q.resolve();
        }, function (err) {
          q.reject(err);
        }, options);
      }catch(e){
        q.reject("Exception: "+e.message);
      }
    }
    return q.promise;
  };

  return $cordovaLaunchNavigator;
}])

// Define a controller to use the promised service
.controller('promisedController', function($scope, $cordovaLaunchNavigator) {
  var destination = "London, UK";
  var start = "Manchester, UK";

  $scope.navigate = function(){
    $cordovaLaunchNavigator.navigate(destination, start).then(function () {
      alert("Navigator launched");
    }, function (err) {
      alert(err);
    });
  };

});
