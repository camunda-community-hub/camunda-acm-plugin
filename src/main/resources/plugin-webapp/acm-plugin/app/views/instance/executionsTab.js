ngDefine('cockpit.plugin.acm-plugin.views', function(module) {

  var ExecutionsCtrl = [ '$scope', 'camundaService', function($scope, camundaService) {
    'use strict';

    // retrieve from parent scope
    var caseData = $scope.caseData.newChild($scope);
	if ($scope.instance) {
		var instance = $scope.instance.newChild($scope);
	}
	
    caseData.observe([ 'executions', function(executions) {
      $scope.caseInstanceExecutions = executions;
    } ]);
	
    var reloadExecutions = function() {
        camundaService.caseExecutions(instance.id).then(function(executions) {
			$scope.caseInstanceExecutions = excutions;
		});
    };


	// starts execution of a task
	$scope.startExecution = function(caseExecutionId) {
		camundaService.startExecution(caseExecutionId).then(function(result) {
			$scope.ExecutionStartResult = result;
			reloadExecutions();
		});
	};
		
	// completes execution of a task
	$scope.completeExecution = function(caseExecutionId) {
		camundaService.completeExecution(caseExecutionId).then(function(result) {
			reloadExecutions();
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
      label : 'Step Executions',
      url : 'plugin://acm-plugin/static/app/views/instance/executionsTab.html',
      controller : ExecutionsCtrl,
      priority : 20
    });
  } ]);

  return module;
});