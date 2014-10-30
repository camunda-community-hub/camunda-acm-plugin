angular.module('acmplugin').factory('taskService', ['camundaService', 'utilService', function(camundaService, utilService) {
'use strict';
  return {
    task : function(task) {
      return camundaService.taskForm(task.id).then(function(form) {
        task.form = form;
        task.createdDate = task.created.replace('T', ' ');
        if (task.caseDefinitionId) {
          // CMMN Human Task
          return camundaService.caseDefinition(task.caseDefinitionId).then(function(caseDefinition) {
            task.definedIn = caseDefinition.name;
            return camundaService.caseInstance(task.caseInstanceId).then(function(caseInstance) {
              task.businessKey = caseInstance.businessKey;
              return camundaService.caseVariables(task.caseInstanceId).then(function(variables) {
                task.variables = utilService.variableArrayToObject(variables);
                return task;
              });
            });
          });

        } else if (task.processDefinitionId) {
          // BPMN user task
          return camundaService.processDefinition(task.processDefinitionId).then(function(processDefinition) {
            task.definedIn = processDefinition.name;
            return camundaService.processInstance(task.processInstanceId).then(function(processInstance) {
              task.businessKey = processInstance.businessKey;
              return camundaService.processVariables(task.caseInstanceId).then(function(variables) {
                task.variables = utilService.variableArrayToObject(variables);
                return task;
              });
            });
          });

        } else {
          // task created via task service
          return task;
        }
      });
    },
  
    /*
     * Update variables and complete task.
     */
    complete : function(task) {
      if (task.caseDefinitionId) {
        return camundaService.updateCaseVariables(task.caseInstanceId, task.variables).then(function(){
          return camundaService.completeTask(task.id);
        });
      } else if (task.processDefinitionId) {
        
      } else {
        
      }
    }
  
  };
}]);
