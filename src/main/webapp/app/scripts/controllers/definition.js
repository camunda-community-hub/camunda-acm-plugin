'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:DefinitionCtrl
 * @description # DefinitionCtrl Controller of the webappApp
 */
module.controller('DefinitionCtrl', function($scope, $routeParams, camundaService) {

  var deployedCaseDefinitions = [];

  /*
   * Definitions
   */
  // retrieve case definitions.
  camundaService.caseDefinitions(true).then(function(data) {

    $scope.caseDefinitions = data;

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