define(['angular'], function(angular) {

  var InstanceCtrl = [ '$scope', 'camundaService', function($scope, camundaService) {
    'use strict';

    // retrieve from parent scope
    var caseData = $scope.caseData.newChild($scope);

    // flag for instance display
    $scope.activeVersionsOnly = true;

    caseData.provide('caseInstances', [ 'definition', function(definition) {
      return camundaService.caseInstances(definition.key, definition.id);
    } ]);

    caseData.observe([ 'caseInstances', function(caseInstances) {
      $scope.caseInstances = caseInstances;
    } ]);
  } ];

//use views module
  var module = angular.module('cockpit.plugin.acm-plugin.views');
  module.config([ 'ViewsProvider', function(ViewsProvider) {
    ViewsProvider.registerDefaultView('cockpit.caseDefinition.runtime.tab', {
      id : 'case-instances-table',
      label : 'Case Instances',
      url : 'plugin://acm-plugin/static/app/views/definition/instancesTab.html',
      controller : InstanceCtrl,
      priority : 20
    });
  } ]);

  return module;
});