angular.module('acmplugin').controller('DefinitionCtrl', ['$scope', '$routeParams', 'camundaService', function($scope, $routeParams, camundaService) {
'use strict';

  var deployedCaseDefinitions = [];

  /*
   * Definitions
   */
  camundaService.caseDefinitions(true).then(function(data) {

    $scope.caseDefinitions = data;
    // retrieve case definitions.
    data.forEach(function(definition) {
      camundaService.caseInstanceCount(definition.id).then(function(result) {
        deployedCaseDefinitions.push({
          'name' : definition.key,
          'id' : definition.id,
          'version' : definition.version,
          'instanceCount' : result.count
        });
      });
    });
    $scope.deployedCaseDefinitions = deployedCaseDefinitions;
  });

  
  camundaService.processDefinitions().then(function(data) {
    // retrieve process definitions.
    $scope.processDefinitions = data;
  });


  // flag for latest case version only
  $scope.latestCaseVersionOnly = true;
  // flag for latest case version only
  $scope.latestProcessVersionOnly = true;
  // flag for active instances only
  $scope.activeVersionsOnly = true;

  // retrieve case definitions.
  $scope.refreshCase = function() {
    camundaService.caseDefinitions($scope.latestVersionOnly).then(function(data) {
      $scope.caseDefinitions = data;
    });
  };
  $scope.refreshCase();

  // retrieve case definitions.
  $scope.refreshProcess = function() {
    camundaService.processDefinitions($scope.latestVersionOnly).then(function(data) {
      $scope.processDefinitions = data;
    });
  };
  
  $scope.refreshCase();
  $scope.refreshProcess();

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
}]);