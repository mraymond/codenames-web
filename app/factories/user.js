app.factory('user', function($rootScope, socket) {
  var service = {};
  service.name = "";
  service.host = false;
  service.setName = function(name, cb) {
    this.name = name;
    socket.emit("USER", {
      name: name
    }, cb);
  }
  return service;
});
