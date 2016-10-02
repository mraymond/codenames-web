app.controller('LobbyController', ['$scope', '$location', 'socket', 'user', 'game',
  function($scope, $location, socket, user, game) {
    // Initialize the scope defaults.
    $scope.gameID = game.gameID;
    $scope.players = game.players;
    $scope.startFlag = false;
    $scope.host = game.host;

    // Forward socket events for this controller
    socket.forward('JOINGAME', $scope);
    socket.forward('INVALIDGAME', $scope);
    socket.forward('STARTGAME', $scope);
    socket.forward('FULLGAME', $scope);
    socket.forward('NOTENOUGH', $scope);
    socket.forward('GAMEOVER', $scope);

    // Start Controller methods
    $scope.createRoom = function() {
      socket.emit("CREATEGAME");
    }
    $scope.joinRoom = function() {
      socket.emit("JOINGAME", {
        gameID: $scope.room
      })
    }
    $scope.start = function() {
      if ($scope.startFlag == 0) {
        $scope.startFlag = 1;
        socket.emit("STARTGAME");
      }
    }
    $scope.$on('socket:FULLGAME', function(ev, data) {
      $scope.$parent.showToast("This game is full.");
    });
    $scope.$on('socket:NOTENOUGH', function(ev, data) {
      $scope.$parent.showToast("There are not enough players to start. 2 players minimum");
      $scope.startFlag = 0;
    });
    $scope.$on('socket:INVALIDGAME', function(ev, data) {
      $scope.$parent.showToast("Invalid game ID");
    });
    $scope.$on('socket:STARTGAME', function(ev, data) {
      game.players = [];
      for (var i = 0, l = data.users.length; i < l; ++i) {
        game.players.push({
          name: data.users[i],
          wins: 0
        });
      }
      if (game.host) {
        $location.path("/game-host");
      } else {
        $location.path("/game-buzzer");
      }
    });
    $scope.$on('socket:JOINGAME', function(ev, data) {
      console.log(data);
      if (data.user === undefined) {
        // Our user
        $location.path("/lobby");
        game.gameID = data.gameID;
        if (data.users === undefined) {
          game.host = true;
        } else {
          game.host = false;
          game.players.push({
            name: user.name,
            wins: 0
          });
          var pCount = data.users.length;
          for (var i = 0; i < pCount; ++i) {
            game.players.push({
              name: data.users[i],
              wins: 0
            });
          }
        }
      } else {
        game.players.push({
          name: data.user
        });
      }
    });
    $scope.$on('socket:GAMEOVER', function(ev, data) {
      game.players.splice(game.players.indexOf(data.leaver), 1);
    });
  }
]);
