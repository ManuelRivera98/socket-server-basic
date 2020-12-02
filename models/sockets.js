class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on('connection', (socket) => {

      // Listen event messageToServer
      socket.on('messageToServer', (data) => {
        console.log(data);

        this.io.emit('messageFromServer', data);
      });
    });
  }
};

module.exports = Sockets;