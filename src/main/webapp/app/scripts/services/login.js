'use strict';

/**
 * @ngdoc function
 * @name webapp.service:loginService
 * @description # loginService Service loginService
 */
module.service('loginService', function($resource, $http) {

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

});
