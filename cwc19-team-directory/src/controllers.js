var myControllers = angular.module('Controller', []);

myControllers.controller('Store', function($scope, $http) {
  $http.get('metadata/data.json').then(function(response) {
    $scope.players = response.data;
    $scope.playerOrder = 'name';
    $scope.direction = '';
  });
});

myControllers.controller('Player', function($scope, $http, $routeParams) {
  $http.get('metadata/data.json').then(function(response) {
    $scope.players = response.data;
    $scope.whichPlayer = $routeParams.playerID;
    if($scope.whichPlayer < 1) {
      $scope.previousPlayer = $scope.players.length - 1;
    } else {
      $scope.previousPlayer = $scope.whichPlayer - 1;
    }
    if($scope.whichPlayer >= 0) {
      if($scope.whichPlayer == $scope.players.length - 1) {
        $scope.nextPlayer = 0;
      } else {
        $scope.nextPlayer = Number($scope.whichPlayer) + 1;
      }
    }
  });
});
