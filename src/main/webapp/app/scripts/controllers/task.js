'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:MainCtrl
 * @description # MainCtrl Controller of the webappApp
 */
module.controller('TaskCtrl', function($scope, $routeParams, $location, $modal, $log, camundaService) {

  if ($routeParams.taskId) {
    
    var taskId = $routeParams.taskId;
    
    camundaService.taskForm(taskId).then(function(result) {
      console.log(result);
      
      $scope.camForm = new CamSDK.Form({
        client : camundaService.camundaApi(),
        formUrl : "http://localhost:8080/cmmn.example1/forms/myForm.html",
        processDefinitionKey : "CarRepairAndReplace:2:9f2b7a81-18a3-11e4-88c5-5c0420524153",
        containerElement : $('#formContainer')
      });
    });

  }

});