ngDefine('cockpit.plugin.acm-plugin.views', function(module) {

  var ExecutionsCtrl = [ '$scope', 'camundaService', function($scope, camundaService) {
    'use strict';

    // retrieve from parent scope
    var caseData = $scope.caseData.newChild($scope);

    caseData.observe([ 'executions', function(executions) {
      $scope.caseInstanceExecutions = executions;
    } ]);

  } ];

  module.config([ 'ViewsProvider', function(ViewsProvider) {
    ViewsProvider.registerDefaultView('cockpit.caseInstance.runtime.tab', {
      id : 'case-steps-table',
      label : 'Step Executions',
      url : 'plugin://acm-plugin/static/app/views/instance/executionsTab.html',
      controller : ExecutionsCtrl,
      priority : 20
    });
  } ]);

  return module;
});