var myApp = angular.module('root', ['ngRoute', 'Controller']);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/store.html',
    controller: 'Store'
  })
  .when('/player/:playerID', {
    templateUrl: 'views/player.html',
    controller: 'Player'
  })
  .otherwise({
    redirectTo: '/'
  });
}]);