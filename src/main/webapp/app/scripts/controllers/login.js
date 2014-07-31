'use strict';

/**
 * @ngdoc function
 * @name webapp.controller:LoginCtrl
 * @description # LoginCtrl Controller of the webapp
 */
module.controller('LoginCtrl', function($scope, loginService) {

  $scope.loggedIn = false;

  $scope.login = function(credentials) {
    $scope.loggedIn = loginService.login($scope.usernameInput, $scope.passwordInput);
    $scope.currentUser = loginService.currentUser();
  }

  $scope.logout = function() {
    $scope.loggedIn = false;
    $scope.currentUser = null;
  }
});
