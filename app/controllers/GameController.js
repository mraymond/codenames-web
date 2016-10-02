app.controller('GameController', ['$scope', '$location', 'user', 'socket', 'game',
  function($scope, $location, user, socket, game) {
    // Initialize the scope defaults.
    // Populating needed scope variables
    $scope.gameID = game.gameID;
    $scope.board = game.board;
    $scope.gameOver = false;
    $scope.returnToLobby = false;
    $scope.paused = false;
    $scope.selectedCard = "";
    var currentIndex = 0;
    $scope.firstPlayer = game.firstPlayer;

    // Our events
    socket.forward('START', $scope);
    socket.forward('RESTART', $scope);
    socket.forward('GAMEOVER', $scope);
    socket.forward('PICKCARD', $scope);

    // Internal
    function checkPlayer(player) {
      for (var i = 0, l = $scope.players.length; i < l; ++i) {
        if ($scope.players[i].name === player) return true;
      }
      return false;
    }

    // Page events
    $scope.checkCurrent = function(player) {
      if (player.name == game.currentTurn) {
        return "active";
      }
    }

    $scope.select = function(card, index) {
      currentIndex = index;
      $scope.selectedCard = card;
    }

    $scope.pickCard = function() {
      socket.emit("PICKCARD", {
        index: currentIndex
      });
      $scope.selectedCard.selected = "flipped";
      $scope.selectedCard = "";
    }

    // Socket events
    $scope.$on("socket:START", function(ev, data) {
      $scope.$parent.showToast("Host has started the game");
      // Display buzzer for players
    });

    $scope.$on("socket:PICKCARD", function(ev, data) {
      $scope.board[data.index].spySelected = "flopped"
        // Display buzzer for players
    });

    $scope.$on("socket:RESTART", function(ev, data) {
      $scope.$parent.showToast("Host has started the game");
      game.currentTurn = "";
      $scope.paused = false;
    });

    $scope.$on("socket:GAMEOVER", function(ev, data) {
      // Hide buzzer, link back to lobby
      $scope.$parent.showToast("The host has ended the game.");
      $scope.returnToLobby = true;
    });

    // player events are ready, so we emit a loadready message to let the server know this client is done
    socket.emit("LOADREADY");
  }
]);
