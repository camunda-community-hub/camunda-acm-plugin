define([ 'angular', './services/main', './views/main' ], function(angular) {
  var ngModule = angular.module('cockpit.plugin.acm-plugin', [ 'cockpit.plugin.acm-plugin.services', 'cockpit.plugin.acm-plugin.views' ]);
  return ngModule;
});