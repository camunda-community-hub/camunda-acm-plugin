define([ 'angular', './views', './dashboard/dashboard',
// case definitions
'./definition/definition', './definition/instancesTab',
// case instances
'./instance/instance', './instance/variablesTab', './instance/executionsTab', './instance/tasksTab' ], function(angular) {
  return angular.module('cockpit.plugin.acm-plugin.views');
});
