angular.module('acmplugin').controller('TaskCtrl', ['$scope', '$routeParams', '$location', '$modal', 'camundaService', function($scope, $routeParams, $location, $modal, camundaService) {
'use strict';

  if ($routeParams.taskId) {

    var taskId = $routeParams.taskId;

    camundaService.taskForm(taskId).then(function(taskFormPath) {

      $scope.taskId = taskId;
      var url = camundaService.jbossUrl() + taskFormPath.contextPath + taskFormPath.key;
      console.log('URL' + url);
      
//      $scope.camForm = new CamSDK.Form({
//        client : camundaService.camundaApi(),
//        formUrl : url,
//        taskId : taskId,
//        caseDefinitionId : 'f8f5f6e3-19c8-11e4-ad31-5c0420524153',
//        containerElement : $('#formContainer'),
//        type: 'case'
//      });

      $scope.camForm = new CamSDK.Form({
        client : camundaService.camundaApi(),
        formUrl : url,
        taskId : taskId,
        processDefinitionId : '742a887a-19ca-11e4-ad31-5c0420524153',
        containerElement : $('#formContainer'),
        type: 'process'
      });

    });

  }
}]);