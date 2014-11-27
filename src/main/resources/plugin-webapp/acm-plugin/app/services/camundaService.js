ngDefine('cockpit.plugin.acm-plugin.services', function(module) {

  module.factory('camundaService', [ '$http', 'utilService', 'Uri', function($http, utilService, Uri) {
    'use strict';

    /*
     * Needed as long as case type is not delivered
     */
    var camundaEngineBaseUrl = Uri.appUri('/engine-rest/engine/:engine');

    return {
      /*
       * Retrieve case definitions
       */
      caseDefinitions : function(latestVersionsOnly, key) {

        var url = camundaEngineBaseUrl + '/case-definition?latest=' + latestVersionsOnly;
        if (key) {
          url += '&key=' + key + '&sortBy=version&sortOrder=desc';
        }
        return $http.get(url).then(function(response) {
          return response.data;
        });
      },

      /*
       * Retrieve case definitions
       */
      caseDefinition : function(caseDefinitionId) {

        return $http.get(camundaEngineBaseUrl + '/case-definition/' + caseDefinitionId).then(function(response) {
          return response.data;
        });
      },

      /*
       * Retrieves diagram
       */
      caseDiagram : function(caseDefinitionId) {
        return camundaEngineBaseUrl + '/case-definition/' + caseDefinitionId + '/diagram';
      },

      /*
       * Start new case for a given id
       */
      startCase : function(caseDefinitionId, caseVariables, businessKey) {
        var requestBody = {
          'variables' : utilService.variableArrayToObject(caseVariables),
          'businessKey' : businessKey
        };
        return $http.post(camundaEngineBaseUrl + '/case-definition/' + caseDefinitionId + '/create', requestBody).then(function(response) {
          return response.data;
        });
      },

      /*
       * Completes task
       */
      completeTask : function(taskId, submitVariables) {
        var url = camundaEngineBaseUrl + '/task/' + taskId + '/complete';
        var requestBody = {
          'variables' : submitVariables
        };
        return $http.post(url, requestBody).then(function(response) {
          return response.code;
        });

      },

      /*
       * Update variables
       */
      updateCaseVariables : function(caseInstanceId, variables) {
        var url = camundaEngineBaseUrl + '/case-instance/' + caseInstanceId + '/variables';
        var requestBody = {
          'modifications' : variables
        };
        return $http.post(url, requestBody).then(function(response) {
          return response.code;
        });

      },
      /*
       * Update variables
       */
      updateProcessVariables : function(processInstanceId, variables) {
        var url = camundaEngineBaseUrl + '/process-instance/' + processInstanceId + '/variables';
        var requestBody = {
          'modifications' : variables
        };
        return $http.post(url, requestBody).then(function(response) {
          return response.code;
        });

      },

      /*
       * Retrieve case instances
       */
      caseInstances : function(caseDefinitionKey, caseDefinitionId, businessKey, active) {

        var url = camundaEngineBaseUrl + '/case-instance';
        var sign = true;

        if (active) {
          sign = false;
          url += '?active=true';
        }

        // load instances for specific case definition
        if (caseDefinitionKey) {
          if (sign) {
            sign = false;
            url += '?';
          }
          url += 'caseDefinitionKey=' + caseDefinitionKey;
        }

        if (caseDefinitionId) {
          if (sign) {
            sign = false;
            url += '?';
          }
          url += '&caseDefinitionId=' + caseDefinitionId;
        }

        if (businessKey) {
          if (sign) {
            sign = false;
            url += '?';
          }
          url += 'businessKey=' + businessKey;
        }

        return $http.get(url).then(function(response) {
          return response.data;
        });
      },

      /*
       * Retrieve case instance count
       */
      caseInstanceCount : function(caseDefinitionId) {
        return $http.get(camundaEngineBaseUrl + '/case-instance/count?active=true&caseDefinitionId=' + caseDefinitionId).then(function(response) {
          return response.data;
        });
      },

      /*
       * Retrieve case instance count
       */
      caseInstanceCountByKey : function(caseDefinitionKey) {
        return $http.get(camundaEngineBaseUrl + '/case-instance/count?active=true&caseDefinitionKey=' + caseDefinitionKey).then(function(response) {
          return response.data;
        });
      },

      /*
       * Retrieve case instance
       */
      caseInstance : function(caseInstanceId) {
        return $http.get(camundaEngineBaseUrl + '/case-instance/' + caseInstanceId).then(function(response) {
          return response.data;
        });
      },

      /*
       * Retrieve case history
       */
      caseHistory : function(caseInstanceId) {
        return $http.get(camundaEngineBaseUrl + '/history/case-activity-instance?caseInstanceId=' + caseInstanceId).then(function(response) {
          return response.data;
        });
      },

      /*
       * Retrieve case instance variables
       */
      caseInstanceVariables : function(caseInstanceId) {
        return $http.get(camundaEngineBaseUrl + '/case-instance/' + caseInstanceId + '/variables').then(function(response) {
          return response.data;
        });
      },

      /*
       * Start new task execution for a given id (human task, process task, case
       * task)
       */
      startExecution : function(caseExecutionId) {
        return $http.post(camundaEngineBaseUrl + '/case-execution/' + caseExecutionId + '/manual-start', '{}').then(function(response) {
          return response.data;
        });
      },

      /*
       * Complete task execution for a given id (human task, process task, case
       * task)
       */
      completeExecution : function(caseExecutionId) {
        return $http.post(camundaEngineBaseUrl + '/case-execution/' + caseExecutionId + '/complete', '{}').then(function(response) {
          return response.data;
        });
      },

      /*
       * Retrieve case executions
       */
      caseExecutions : function(caseInstanceId) {

        var url = camundaEngineBaseUrl + '/case-execution';
        if (caseInstanceId) {
          url += '?caseInstanceId=' + caseInstanceId;
        }

        var future = $http.get(url).then(function(response) {
          return response.data;
        });
        return future;
      },

//      /*
//       * Retrieve case executions
//       */
//      caseExecutions : function(caseInstanceId) {
//        var url = pluginExtensionBaseUrl + '/case-execution-detailed/' + caseInstanceId;
//        return $http.get(url).then(function(response) {
//          return response.data;
//        });
//      },

      /*
       * Retrieve tasks
       */
      tasks : function(caseInstanceId) {
        var url = camundaEngineBaseUrl + '/task';
        if (caseInstanceId) {
          url += '?caseInstanceId=' + caseInstanceId;
        }
        return $http.get(url).then(function(response) {
          return response.data;
        });
      },

      /*
       * Retrieve task
       */
      task : function(taskId) {
        var url = camundaEngineBaseUrl + '/task/' + taskId;
        return $http.get(url).then(function(response) {
          return response.data;
        });
      },

      /*
       * Retrieve task form
       */
      taskForm : function(taskId) {
        var url = camundaEngineBaseUrl + '/task/' + taskId + '/form';
        return $http.get(url).then(function(response) {
          if (!response.data.contextPath) {
            response.data.contextPath = '/cmmn.kfz/';
          }
          return response.data;
        });
      },

      /*
       * process definitions
       */
      processDefinitions : function(latestVersionsOnly, key) {
        var url = camundaEngineBaseUrl + '/process-definition?latest=' + latestVersionsOnly;
        if (key) {
          url += '&key=' + key + '&sortBy=version&sortOrder=desc';
        }
        return $http.get(url).then(function(response) {
          return response.data;
        });
      },

      /*
       * process definition
       */
      processDefinition : function(processDefinitionId) {
        var url = camundaEngineBaseUrl + '/process-definition/' + processDefinitionId;
        return $http.get(url).then(function(response) {
          return response.data;
        });
      },

      /*
       * Retrieve process instances
       */
      processInstances : function(processDefinitionKey, processDefinitionId) {
        var url = camundaEngineBaseUrl + '/process-instance';
        // load instances for specific case definition
        if (processDefinitionKey) {
          url += '?processDefinitionKey=' + processDefinitionKey;
          if (processDefinitionId) {
            url += '&processDefinitionId=' + processDefinitionId;
          }
        }
        return $http.get(url).then(function(response) {
          return response.data;
        });
      },

      /*
       * process instance
       */
      processInstance : function(processInstanceId) {
        var url = camundaEngineBaseUrl + '/process-instance/' + processInstanceId;
        return $http.get(url).then(function(response) {
          return response.data;
        });
      },

      /*
       * process variable
       */
      processVariables : function(processInstanceId) {
        var url = camundaEngineBaseUrl + '/variable-instance?processInstanceIdIn=' + processInstanceId;
        return $http.get(url).then(function(response) {
          return response.data;
        });
      },

      /*
       * case variable
       */
      caseVariables : function(caseInstanceId) {
        var url = camundaEngineBaseUrl + '/variable-instance?caseInstanceIdIn=' + caseInstanceId;
        return $http.get(url).then(function(response) {
          return response.data;
        });
      },
    };
  } ]);

  return module;
});
