var app = angular
.module('root', [
  'angularMoment',
  'ngRoute',
  'myControllers'
])
.config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/store.html',
        controller: 'MainController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
]);