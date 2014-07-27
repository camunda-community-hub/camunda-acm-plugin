'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:DefinitionsCtrl
 * @description # DefinitionsCtrl Controller of the webappApp
 */
module.controller('DefinitionsCtrl', function($scope, camundaService) {

	$scope.latestVersionOnly = true;
	
	// retrieve case definitions.
	$scope.refresh = function() {
		camundaService.caseDefinitions($scope.latestVersionOnly).then(function(data) {
			$scope.caseDefinitions = data;
		});
	};

	
	$scope.refresh();
});
