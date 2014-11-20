ngDefine('cockpit.plugin.acm-plugin.views', function(module) {

  var DefinitionCtrl = [ '$scope', '$routeParams', 'camundaService', 'Views', 'page', 'search', 'breadcrumbTrails', 'dataDepend',
      function($scope, $routeParams, camundaService, Views, page, search, breadcrumbTrails, dataDepend) {
        'use strict';

        // create data depend item & store for sub-scopes
        var caseData = $scope.caseData = dataDepend.create($scope);

        /*
         * Single definition display
         */
        // only load if case definition id is selected.
        if ($routeParams.caseDefinitionId) {

          /*
           * Providers
           */
          caseData.provide('definition', [ function() {
            // load the case definition
            return camundaService.caseDefinition($routeParams.caseDefinitionId);
          } ]);

          caseData.provide('instances', [ 'definition', function(definition) {
            // load the case definition
            return camundaService.caseInstances(definition.key, definition.id);
          } ]);

          caseData.provide('definitionsByKey', [ 'definition', function(definition) {
            return camundaService.caseDefinitions(false, definition.key);
          } ]);

          caseData.provide('instances.all', [ 'definition', function(definition) {
            return camundaService.caseInstanceCountByKey(definition.key);
          } ]);

          caseData.provide('instances.current', [ 'definition', function(definition) {
            return camundaService.caseInstanceCount(definition.id);
          } ]);

          caseData.provide('definitionDiagram', ['definition', function(definition) {
            return camundaService.caseDiagram(definition.id);
          } ]);

          /*
           * Observers
           */
          caseData.observe([ 'definition', function(definition) {
            $scope.selectedCase = definition;
          } ]);

          caseData.observe([ 'definitionDiagram', 'definition', function(definitionDiagram) {
            $scope.selectedCase.src = definitionDiagram;
          } ]);

          
          caseData.observe([ 'definitionsByKey', function(definitions) {
            $scope.caseVersions = definitions;
          } ]);

          /*
           * Bread Crumbs & Title
           */
          caseData.observe([ 'definition', function(definition) {
            page.breadcrumbsClear();

            page.breadcrumbsAdd({
              type : 'caseDefinition',
              label : definition.name || definition.key || definition.id,
              href : '#/case-definition/' + definition.id,
              caseDefinition : definition
            });
            page.titleSet([ 'camunda Cockpit', definition.name || definition.key || definition.id, 'Case Definition View' ].join(' | '));
          } ]);
        }

        /*
         * Collect statistics
         */
        $scope.instanceStatistics = caseData.observe([ 'instances.all', 'instances.current' ], function(all, current) {
            $scope.instanceStatistics.all = all.count;
            $scope.instanceStatistics.current = current.count;
        });


        
        $scope.caseDefinitionVars = { read: [ 'definition', 'instances', 'caseData' ] };

        $scope.caseDefinitionActions = Views.getProviders({ component : 'cockpit.caseDefinition.runtime.action'});
        $scope.caseDefinitionTabs = Views.getProviders({ component : 'cockpit.caseDefinition.runtime.tab' });
        

        function setDefaultTab(tabs) {
          var selectedTabId = search().detailsTab;
          if (!tabs || !tabs.length) {
            return;
          }
          if (selectedTabId) {
            var provider = Views.getProvider({ component : 'cockpit.caseInstance.runtime.tab', id : selectedTabId });
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
        setDefaultTab($scope.caseDefinitionTabs);

      } ];

  // register routing for case definitions
  module.config([ '$routeProvider', function($routeProvider) {

    $routeProvider.when('/case-definition/:caseDefinitionId', {
      templateUrl : require.toUrl('../../api/cockpit/plugin/acm-plugin/static/app/views/definition/definition.html'),
      controller : DefinitionCtrl,
      authentication : 'required'
    });
  } ]);

  return module;
});