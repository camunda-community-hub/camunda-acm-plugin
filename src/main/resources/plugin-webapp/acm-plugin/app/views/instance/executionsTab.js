ngDefine('cockpit.plugin.acm-plugin.views', function(module) {

  var ExecutionsCtrl = [ '$scope', 'camundaService', function($scope, camundaService) {
    'use strict';

    // retrieve from parent scope
    var caseData = $scope.caseData.newChild($scope);
	
    caseData.observe([ 'executions', function(executions) {
      $scope.caseInstanceExecutions = executions;
    } ]);

    caseData.provide( 'historyExecutions', ['instance', function(instance) {
      return camundaService.caseHistory(instance.id);
    } ]);

    caseData.observe([ 'historyExecutions', function(historyExecutions) {
      $scope.caseHistoryExecutions = historyExecutions;
    } ]);

    
	// starts execution of a task
	$scope.startExecution = function(caseExecutionId) {
		camundaService.startExecution(caseExecutionId).then(function(result) {
			$scope.ExecutionStartResult = result;
			caseData.changed('executions');
		});
	};
		
	// completes execution of a task
	$scope.completeExecution = function(caseExecutionId) {
		camundaService.completeExecution(caseExecutionId).then(function(result) {
		  caseData.changed('executions');
		});
	};
		
	// opens human task form
	$scope.openTaskForm = function(task) {
		  console.log(task);
	};

  } ];

  module.config([ 'ViewsProvider', function(ViewsProvider) {
    ViewsProvider.registerDefaultView('cockpit.caseInstance.runtime.tab', {
      id : 'case-steps-table',
      label : 'Task Overview',
      url : 'plugin://acm-plugin/static/app/views/instance/executionsTab.html',
      controller : ExecutionsCtrl,
      priority : 30
    });
  } ]);

  return module;
});