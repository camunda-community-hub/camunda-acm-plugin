'use strict';

/**
 * @ngdoc overview
 * @name webappApp
 * @description # webappApp
 * 
 * Main module of the application.
 */
var module = angular.module('webappApp', [ 'ngAnimate', 'ngCookies', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch', 'ui.bootstrap', 'cam.embedded.forms' ]);

module.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl : 'views/main.html',
    controller : 'DefinitionCtrl'
  }).when('/instances', {
    templateUrl : 'views/instances.html',
    controller : 'InstanceCtrl'
  }).when('/instance/:instanceId', {
    templateUrl : 'views/instance.html',
    controller : 'InstanceCtrl'
  }).when('/definitions', {
    templateUrl : 'views/definitions.html',
    controller : 'DefinitionCtrl'
  }).when('/definition/:caseDefinitionId', {
    templateUrl : 'views/definition.html',
    controller : 'DefinitionCtrl'
  }).when('/task/:taskId', {
    templateUrl : 'views/task.html',
    controller : 'TaskCtrl'
  }).otherwise({
    redirectTo : '/'
  });
});

module.filter('instanceFilter', function() {
  return function(instances, activeVersionsOnly) {
    if (!activeVersionsOnly) {
      return instances;
    }

    console.log(instances);
    var filtered = [];
    angular.forEach(instances, function(instance) {
      if (instance.hasOwnProperty("active") && instance.active) {
          filtered.push(instance);
      } else if (instance.hasOwnProperty("ended") && !instance.ended) {
          filtered.push(instance);
      }
    });
    return filtered;
  };
});
