ngDefine('cockpit.plugin.acm-plugin.views',[ 
 // dashboard
 './dashboard/dashboard',
 
 // case definitions
 './definition/definition',
 './definition/instancesTab',
 
 // case instances
 './instance/instance',
 './instance/variablesTab',
 './instance/executionsTab',
 './instance/tasksTab' 
 
], function(module) {
  return module;
});
