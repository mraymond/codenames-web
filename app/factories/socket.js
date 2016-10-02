app.factory('socket', function(socketFactory) {
  return socketFactory({
    prefix: 'socket:',
    ioSocket: io.connect('ws://this.is.luigiman.net:4454/')
  });
});
