'use strict';

/**
 * @ngdoc function
 * @name webappApp.service:camundaService
 * @description # camundaService Service camundaService
 */
module.factory('camundaService', function($http) {

	var camundaEngineBaseUrl = 'http://localhost:8080/engine-rest/engine/default';

	return {		
		
		/*
		 * Retrieve case definitions
		 */
		caseDefinitions: function(latestVersionsOnly, key) {
			
			var url = camundaEngineBaseUrl + '/case-definition?latest=' + latestVersionsOnly;
			if (key) {
				url += '&key=' + key + '&sortBy=version&sortOrder=desc';
			}
			var future = $http.get(url).then(function (response) {
				return response.data;
			});
			return future;
		},

		/*
		 * Retrieve case definitions
		 */
		caseDefinition: function(caseDefinitionId) {
			
			var future = $http.get(camundaEngineBaseUrl + '/case-definition/' + caseDefinitionId).then(function (response) {
				return response.data;
			});
			return future;
		},

		/*
	     * Start new case for a given id 
	     */
		startCase: function(caseDefinitionId) {
			console.log('Starting new case: ' + caseDefinitionId);			
			
			var future = $http.post(camundaEngineBaseUrl + '/case-definition/' + caseDefinitionId + '/create', '{}').then(function (response) {
				return response.data;
			});
			return future;
		},
		
		/*
		 * Retrieve case instances
		 */
		caseInstances: function(caseDefinitionKey, caseDefinitionId) {
			
			var url = camundaEngineBaseUrl + '/case-instance';
			
			// load instances for specific case definition
			if (caseDefinitionKey) {
				url += '?caseDefinitionKey=' + caseDefinitionKey;
				if (caseDefinitionId) {
					url += '&caseDefinitionId=' + caseDefinitionId;
				}
			}
			
			var future = $http.get(url).then(function (response) {
				return response.data;
			});
			return future;
		},

		/*
	     * Start new task execution for a given id (human task, process task, case task)
	     */
		startExecution: function(caseExecutionId) {
			console.log('New execution: ' + caseDefinitionId);			
			
			var future = $http.post(camundaEngineBaseUrl + '/case-execution/' + caseExecutionId + '/manual-start', '{}').then(function (response) {
				return response.data;
			});
			return future;
		},

		/*
	     * Complete task execution for a given id (human task, process task, case task)
	     */
		completeExecution: function(caseExecutionId) {
			console.log('Complete execution: ' + caseDefinitionId);			
			
			var future = $http.post(camundaEngineBaseUrl + '/case-execution/' + caseExecutionId + '/complete', '{}').then(function (response) {
				return response.data;
			});
			return future;
		},


		/*
		 * Retrieve case instance count
		 */
		caseInstanceCount: function(caseDefinitionId) {
			
			var future = $http.get(camundaEngineBaseUrl + '/case-instance/count?caseDefinitionId=' + caseDefinitionId).then(function (response) {
				return response.data;
			});
			return future;
		},

		/*
		 * Retrieve case instance
		 */
		caseInstance: function(caseInstanceId) {
			
			var future = $http.get(camundaEngineBaseUrl + '/case-instance/' + caseInstanceId).then(function (response) {
				return response.data;
			});
			return future;
		},

		/*
		 * Retrieve case instance variables
		 */
		caseIntanceVariables: function(caseInstanceId) {
			
			var future = $http.get(camundaEngineBaseUrl + '/case-instance/' + caseInstanceId + '/variables').then(function (response) {
				return response.data;
			});
			return future;
		},

		/*
		 * Retrieve case executions
		 */
		caseExecutions: function(caseInstanceId) {
			
			var url = camundaEngineBaseUrl+ '/case-execution';
			if (caseInstanceId) {
				url += '?caseInstanceId=' + caseInstanceId + '&enabled=true';
			}
			
			var future = $http.get(url).then(function (response) {
				return response.data;
			});
			return future;
		},
		
		/*
		 * Retrieve tasks
		 */
		tasks: function(caseInstanceId) {
			
			var url = camundaEngineBaseUrl+ '/task';
			if (caseInstanceId) {
				url += '?caseInstanceId=' + caseInstanceId;
			}
			
			var future = $http.get(url).then(function (response) {
				return response.data;
			});
			return future;
		},
		
	};
	
});
