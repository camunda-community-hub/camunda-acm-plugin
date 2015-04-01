define(['angular'], function(angular) {

  var TasksCtrl = [ '$scope', 'camundaService', function($scope, camundaService) {
    'use strict';

    // retrieve from parent scope
    var caseData = $scope.caseData.newChild($scope);

    caseData.observe([ 'tasks', function(tasks) {
      $scope.tasks = tasks;
    } ]);

  } ];

  var module = angular.module('cockpit.plugin.acm-plugin.views');
  module.config([ 'ViewsProvider', function(ViewsProvider) {
    ViewsProvider.registerDefaultView('cockpit.caseInstance.runtime.tab', {
      id : 'case-tasks-table',
      label : 'User Tasks',
      url : 'plugin://acm-plugin/static/app/views/instance/tasksTab.html',
      controller : TasksCtrl,
      priority : 10
    });
  } ]);

  return module;
});