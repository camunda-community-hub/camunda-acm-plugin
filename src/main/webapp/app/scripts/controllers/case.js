'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:CaseCtrl
 * @description # CaseCtrl Controller of the webappApp
 */
module.controller('CaseCtrl', function($scope, $routeParams, camundaService) {


	// retrieve all case definitions.
	camundaService.caseDefinitions(true).then(function(data) {
		$scope.caseDefinitions = data
	});

	
	// start a case.
	$scope.startCase = function() {
		console.log($scope.caseDefinition);
		camundaService.startCase($scope.caseDefinition.id);
	};

	// only load if case definition id is selected.
	if ($routeParams.caseDefinitionId) {	

		$scope.selectedCase = null;
		
		// load the definition
		camundaService.caseDefinition($routeParams.caseDefinitionId).then(function(caseDef) {
			// load all versions of the same key
			$scope.selectedCase = caseDef;
			console.log($scope.selectedCase);
			camundaService.caseDefinitions(false, $scope.selectedCase.key).then(function(versions) {
				$scope.caseDefinitionVersions = versions;
			});
		});
		
		// retrieve case instances.
		$scope.versionChange = function() {
			var updateCaseInstances = function(data) {
				$scope.caseInstances = data;
			};
			
			var selectedCaseKey;
			if ($scope.selectedCase) {
				selectedCaseKey = $scope.selectedCase.key;
			} else {
				selectedCaseKey = null;
			}
			
			if ($scope.selectedCaseVersion) {
				camundaService.caseInstances(selectedCaseKey, $scope.selectedCaseVersion.id).then(updateCaseInstances);
			} else {
				camundaService.caseInstances(selectedCaseKey).then(updateCaseInstances);
			}
		};
		
		$scope.versionChange();		
	} else {
		$scope.selectedCase = null;
	}
	
});
