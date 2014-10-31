ngDefine('cockpit.plugin.acm-plugin.views', function(module) {

  var InstanceCtrl = [ '$scope', '$routeParams', 'camundaService', 'dataDepend', 'Views', 'page', 'search', 
               function($scope, $routeParams, camundaService, dataDepend, Views, page, search) {
    'use strict';

    // create data depend item & store for sub-scopes
    var caseData = $scope.caseData = dataDepend.create($scope);

    /*
     * Single instance display
     */
    // only load if case instance id is selected.
    if ($routeParams.instanceId) {

      /*
       * Providers
       */
      caseData.provide('instance', [ function() {
        // load the case definition
        return camundaService.caseInstance($routeParams.instanceId);
      } ]);

      caseData.provide('definition', [ 'instance', function(instance) {
        // load the case definition
        return camundaService.caseDefinition(instance.caseDefinitionId);
      } ]);

      caseData.provide('executions', [ 'instance', function(instance) {
        // executions
        return camundaService.caseExecutions(instance.id);
      } ]);

      caseData.provide('tasks', [ 'instance', function(instance) {
        // executions
        return camundaService.tasks(instance.id);
      } ]);

      /*
       * Observers
       */
      caseData.observe(['instance', 'definition', function(instance, definition) {
        $scope.selectedInstance = instance;
        $scope.selectedDefinition = definition;
      }]);

    }

    $scope.caseInstanceVars = {
      read : [ 'caseData', 'instance', 'tasks', 'executions' ]
    };

    $scope.caseInstanceActions = Views.getProviders({
      component : 'cockpit.caseInstance.runtime.action'
    });
    $scope.caseInstanceTabs = Views.getProviders({
      component : 'cockpit.caseInstance.runtime.tab'
    });

    function setDefaultTab(tabs) {
      var selectedTabId = search().detailsTab;
      if (!tabs || !tabs.length) {
        return;
      }
      if (selectedTabId) {
        var provider = Views.getProvider({
          component : 'cockpit.caseInstance.runtime.tab',
          id : selectedTabId
        });
        if (provider && tabs.indexOf(provider) != -1) {
          $scope.selectedTab = provider;
          return;
        }
      }
      search.updateSilently({
        detailsTab : null
      });
      $scope.selectedTab = tabs[0];
    }

    /*
     * Tabs handling
     */
    $scope.selectTab = function(tabProvider) {
      $scope.selectedTab = tabProvider;
      search.updateSilently({
        detailsTab : tabProvider.id
      });
    };
    setDefaultTab($scope.caseInstanceTabs);

  } ];

  // register routing for case definitions
  module.config([ '$routeProvider', function($routeProvider) {

    $routeProvider.when('/case-instance/:instanceId', {
      templateUrl : require.toUrl('../../api/cockpit/plugin/acm-plugin/static/app/views/instance/instance.html'),
      controller : InstanceCtrl,
      authentication : 'required'
    });

  } ]);

  return module;
});