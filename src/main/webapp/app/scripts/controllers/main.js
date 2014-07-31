'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:MainCtrl
 * @description # MainCtrl Controller of the webappApp
 */
module.controller('MainCtrl', function($scope, camundaService) {

	var deployedCaseExecutions = [];

	// retrieve case executions.
	camundaService.caseDefinitions(true).then(
			function(data) {
				data.forEach(function(definition) {
					camundaService.caseInstanceCount(definition.id).then(
							function(result) {
								deployedCaseExecutions.push({
									'name' : definition.key,
									'id' : definition.id,
									'version' : definition.version,
									'instanceCount' : result.count
								});
							});
				});
				$scope.deployedCaseExecutions = deployedCaseExecutions;
			});
});