app.factory('socket', function(socketFactory) {
  return socketFactory({
    prefix: 'socket:',
    ioSocket: io.connect('ws://deb.work.novify.me:4454/')
  });
});
