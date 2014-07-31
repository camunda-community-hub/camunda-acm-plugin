'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:DefinitionCtrl
 * @description # DefinitionCtrl Controller of the webappApp
 */
module.controller('DefinitionCtrl', function($scope, $routeParams, $location, $modal, $log, camundaService) {

  /*
   * Alerting
   */

  // alert handling
  $scope.alerts = [];

  // remove alert
  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  // open start case modal dialog
  $scope.open = function(size) {
    var modalInstance = $modal.open({
      templateUrl : 'startCaseForm.html',
      controller : startCaseController,
      size : size,
      resolve : {
        caseDefinition : function() {
          return $scope.caseDefinition;
        }
      }
    });

    // react on instance creation
    modalInstance.result.then(
    // success
    function(instance) {
      if (instance) {
        $scope.alerts.push({
          msg : "New case instance with id " + instance.id + " has been sucessfully started.",
          type : "success"
        });
        $location.path('/instance/' + instance.id);
      } else {
        $scope.alerts.push({
          msg : "Failed to start instance.",
          type : "danger"
        });
      }

    },
    // cancel
    function() {
      // $log.info('Modal closed');
    });
  };

  /*
   * Please note that $modalInstance represents a modal window (instance)
   * dependency. It is not the same as the $modal service used above.
   */
  var startCaseController = function($scope, $modalInstance, caseDefinition) {

    $scope.caseDefinition = caseDefinition;
    $scope.businessKey = "1";
    $scope.caseVariables = [];

    // start a case.
    $scope.ok = function() {
      console.log($scope.businessKey);
      camundaService.startCase(caseDefinition.id, $scope.caseVariables, $scope.businessKey).then(function(instance) {
        $modalInstance.close(instance);
      });
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

    $scope.addVariable = function() {
      $scope.caseVariables.push({
        name : '',
        value : '',
        type : 'String'
      });
    };
    
    $scope.dataTypes = ['String', 'Boolean', 'Integer', 'Date', 'Long'];
  };

  /*
   * Definitions
   */
  // retrieve all case definitions.
  camundaService.caseDefinitions(true).then(function(data) {
    $scope.caseDefinitions = data
  });

  // flag for latest version only
  $scope.latestVersionOnly = true;
  // flag for active instances only
  $scope.activeVersionsOnly = true;

  // retrieve case definitions.
  $scope.refresh = function() {
    camundaService.caseDefinitions($scope.latestVersionOnly).then(function(data) {
      $scope.caseDefinitions = data;
    });
  };
  $scope.refresh();

  /*
   * Single definition display
   */
  // only load if case definition id is selected.
  if ($routeParams.caseDefinitionId) {

    // load the case definition
    camundaService.caseDefinition($routeParams.caseDefinitionId).then(function(caseDef) {

      $scope.selectedCase = caseDef;
      $scope.selectedCaseVersion = caseDef;

      // load all versions of the same key
      console.log($scope.selectedCase);
      camundaService.caseDefinitions(false, $scope.selectedCase.key).then(function(versions) {
        $scope.caseDefinitionVersions = versions;

        // load all
        // instances for
        // the same key
        camundaService.caseInstances($scope.selectedCase.key, $scope.selectedCase.id).then(function(data) {
          $scope.caseInstances = data;
        });
      });
    });
  }

});