angular.module('acmplugin').service('loginService', ['$resource', '$http', function($resource, $http) {
'use strict';

  var loggedInUser;

  this.login = function(username, password) {
    loggedInUser = {
      'username' : username,
      'name' : 'Kermit the Frog'
    };
    return true;
  }

  this.currentUser = function() {
    return loggedInUser;
  }

}]);
