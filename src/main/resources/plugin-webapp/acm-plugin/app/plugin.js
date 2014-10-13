ngDefine('cockpit.plugin.acm-plugin', ['jquery', 'angular'], function(module) {

  var DashboardController = function($scope, $http, Uri) {

    // flag for latest case version only
    $scope.latestCaseVersionOnly = true;

    
    var prefix = 'plugin://acm-plugin/default';
    var url = prefix + '/case-definition?latest=' + $scope.latestVersionsOnly;
    $http.get(Uri.appUri(url)).then(function(response) {      
      // retrieve case definitions.
      response.data.forEach(function(definition) {
        $http.get(prefix + '/case-instance/count?active=true&caseDefinitionId=' + definition.id).then(function(response) {
          $scope.deployedCaseDefinitions.push({
            'name' : definition.key,
            'id' : definition.id,
            'version' : definition.version,
            'instanceCount' : response.data.count
          });
        });
      });
    }); 
  };

  DashboardController.$inject = ["$scope", "$http", "Uri"];

  var Configuration = function Configuration(ViewsProvider) {

    ViewsProvider.registerDefaultView('cockpit.dashboard', {
      id: 'case-definitions',
      label: 'Deployed Case Definitions',
      url: 'plugin://acm-plugin/static/app/dashboard.html',
      controller: DashboardController,

      // make sure we have a higher priority than the default plugin
      priority: 12
    });
  };

  Configuration.$inject = ['ViewsProvider'];

  module.config(Configuration);
});