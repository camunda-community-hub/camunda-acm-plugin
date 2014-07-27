'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:InstancesCtrl
 * @description # InstancesCtrl Controller of the webappApp
 */
module.controller('InstancesCtrl', function($scope, camundaService) {
	
	// retrieve case instances.
	camundaService.caseInstances().then(function(data) {
		$scope.caseInstances = data;
	});


});
