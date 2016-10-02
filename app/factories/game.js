app.factory('game', function(socket) {
  var service = {};
  service.gameID = "";
  service.host = false;
  service.players = [];
  return service;
});
