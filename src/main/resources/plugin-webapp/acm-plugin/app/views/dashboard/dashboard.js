define(['angular'], function(angular) {
  'use strict';
  
  var DashboardCtrl = [ '$scope', '$routeParams', 'camundaService', 
                function($scope, $routeParams, camundaService) {
    'use strict';

  $scope.tabs = [
    { title:'List' }
  ];
  
    /*
     * Case Definitions
     */
    camundaService.caseDefinitions(true).then(function(data) {
      // retrieve case definitions.
      var deployedCaseDefinitions = [];
      data.forEach(function(definition) {
        camundaService.caseInstanceCount(definition.id).then(function(result) {
          deployedCaseDefinitions.push({
            'name' : definition.name,
            'key' : definition.key,
            'id' : definition.id,
            'version' : definition.version,
            'instanceCount' : result.count
          });
        });
      });
      $scope.caseDefinitions = deployedCaseDefinitions;
    });
  } ];

  // use views module
  var module = angular.module('cockpit.plugin.acm-plugin.views');
  
  // register controller and view
  module.config([ 'ViewsProvider', function Configuration(ViewsProvider) {
    ViewsProvider.registerDefaultView('cockpit.dashboard', {
      id : 'dashboard',
      label : 'Case Dashboard',
      url : 'plugin://acm-plugin/static/app/views/dashboard/dashboard.html',
      controller : DashboardCtrl,
      priority : 12
    });
  } ]);

  // register instance filter
  module.filter('instanceFilter', function() {
    return function(instances, activeVersionsOnly) {
      if (!activeVersionsOnly) {
        return instances;
      }

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

  return module;
});
