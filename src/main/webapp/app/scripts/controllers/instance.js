'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:InstanceCtrl
 * @description # InstanceCtrl Controller of the webappApp
 */
module.controller('InstanceCtrl', function($scope, $routeParams, camundaService) {


	// only load if case definition id is selected.
	if ($routeParams.instanceId) {	

		$scope.selectedInstance = null;
		
		// load the instance
		camundaService.caseInstance($routeParams.instanceId).then(function(instance) {
			// load all versions of the same key
			$scope.selectedInstance = instance;
			console.log($scope.selectedInstance);

			camundaService.caseIntanceVariables($scope.selectedInstance.id).then(function(variables) {
//				console.log(variables);
				$scope.caseInstanceVariables = variables; 
			});
			
			camundaService.caseExecutions($scope.selectedInstance.id).then(function(executions) {
				$scope.caseInstanceExecutions = executions;
			});
		});
	} else {
		$scope.selectedInstance = null;
	}
	
});
