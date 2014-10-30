angular.module('acmplugin').controller('LoginCtrl', [ '$scope', 'loginService', function($scope, loginService) {
'use strict';

  $scope.loggedIn = false;

  $scope.login = function(credentials) {
    $scope.loggedIn = loginService.login($scope.usernameInput, $scope.passwordInput);
    $scope.currentUser = loginService.currentUser();
  }

  $scope.logout = function() {
    $scope.loggedIn = false;
    $scope.currentUser = null;
  }
}]);
