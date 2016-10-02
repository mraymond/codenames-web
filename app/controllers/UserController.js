app.controller('UserController', ['$scope', '$location', 'user', 'socket', 'game',
  function($scope, $location, user, socket, game) {
    // Initialize the scope defaults.
    $scope.loaded = false;
    // Start Controller methods
    $scope.login = function() {
        socket.emit("JOINGAME", {
          gameID: $scope.room
        });
        user.host = false;
        user.logged = true;
      }
      //socket.forward('WELCOME', $scope);
    socket.forward('NAMETAKEN', $scope);
    socket.forward('JOINGAME', $scope);
    socket.forward('INIT', $scope);

    $scope.createRoom = function() {
      //$location.path("/game-board");
      socket.emit("CREATEGAME", {
        list: $scope.selectedList
      });
      user.logged = true;
      user.host = true;
    }

    $scope.$on('socket:INIT', function(ev, data) {
      $scope.wordLists = data;
      $scope.loaded = true;
    });

    $scope.$on('socket:JOINGAME', function(ev, data) {
      console.log("here", data);
      if (user.host) {
        $location.path("/game-board");
      } else {
        $location.path("/game-spymaster");
      }
      game.gameID = data.gameID;
      game.board = data.board;
      game.firstPlayer = data.firstPlayer
    });


    /*$scope.$on("socket:WELCOME", function() {
      $location.path("/lobby");
    });*/
    $scope.$on("socket:NAMETAKEN", function() {
      $scope.$parent.showToast('This name is in use');
    });
    socket.emit("INIT");
  }
]);
