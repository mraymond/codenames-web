var app = angular.module('Buzz', ['ngRoute', 'ngAnimate', 'btford.socket-io', 'ngModal'], ['$locationProvider', '$routeProvider',
  function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(false).hashPrefix('!');
    $routeProvider
      .when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'UserController'
      }).when('/inter', {
        templateUrl: 'templates/inter.html',
        controller: 'LobbyController'
      }).when('/join', {
        templateUrl: 'templates/join.html',
        controller: 'LobbyController'
      }).when('/lobby', {
        templateUrl: 'templates/lobby.html',
        controller: 'LobbyController'
      }).when('/game-board', {
        templateUrl: 'templates/game-board.html',
        controller: 'GameController'
      }).when('/game-spymaster', {
        templateUrl: 'templates/game-spymaster.html',
        controller: 'GameController'
      }).otherwise({
        redirectTo: '/login'
      });
  }
]);
