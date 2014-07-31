'use strict';

/**
 * @ngdoc overview
 * @name webappApp
 * @description
 * # webappApp
 *
 * Main module of the application.
 */
var module = angular
  .module('webappApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ]);

module.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/instances', {
        templateUrl: 'views/instances.html',
        controller: 'InstanceCtrl'
      })
      .when('/instance/:instanceId', {
        templateUrl: 'views/instance.html',
        controller: 'InstanceCtrl'
      })
      .when('/definitions', {
        templateUrl: 'views/definitions.html',
        controller: 'DefinitionCtrl'
      })
      .when('/definition/:caseDefinitionId', {
        templateUrl: 'views/definition.html',
        controller: 'DefinitionCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });


module.filter('instanceFilter', function() {
	return function(instances, activeVersionsOnly) {
//		console.log(activeVersionsOnly)
		if (!activeVersionsOnly) {
			return instances;
		}

		var filtered = [];
		angular.forEach(instances, function(instance) {
			if (instance.active) {
				filtered.push(instance);
			}
		});
		return filtered;
	};
});