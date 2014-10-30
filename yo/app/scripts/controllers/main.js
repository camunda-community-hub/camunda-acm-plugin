angular.module('acmplugin').controller('MainCtrl', ['$scope', '$routeParams', '$location', '$modal', 'camundaService', function($scope, $routeParams, $location, $modal, camundaService) {
'use strict';
		
  /*
   * Definitions
   */
  // retrieve case definitions.
  camundaService.caseDefinitions(true).then(function(data) {
    $scope.caseDefinitions = data;
  });

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
          msg : 'New case instance with id ' + instance.id + ' has been started successfully.',
          type : 'success'
        });
        $location.path('/instance/' + instance.id);
      } else {
        $scope.alerts.push({
          msg : 'Failed to start new case instance.',
          type : 'danger'
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

    $scope.dataTypes = [ 'String', 'Boolean', 'Integer', 'Date', 'Long' ];

    $scope.caseDefinition = caseDefinition;
    $scope.caseDefinition.businessKey = '';
    $scope.caseDefinition.caseVariables = [];

    // start a case.
    $scope.ok = function() {
      // console.log('BusinessKey' + $scope.businessKey);
      camundaService.startCase(caseDefinition.id, $scope.caseDefinition.caseVariables, $scope.caseDefinition.businessKey).then(function(instance) {
        $modalInstance.close(instance);
      }, function() {
        $modalInstance.close();
      });
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

    // add new variable
    $scope.addVariable = function() {
      $scope.caseDefinition.caseVariables.push({
        name : '',
        value : '',
        type : 'String'
      });
    };

    // remove variable
    $scope.removeVariable = function(variable) {
      var variableFilter = function(element) {
        return element != variable;
      }
      $scope.caseDefinition.caseVariables = $scope.caseDefinition.caseVariables.filter(variableFilter);
    }
  };
  
  startCaseController.$inject = ['$scope', '$modalInstance'];
  

}]);