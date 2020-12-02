// Server express
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const Sockets = require('./sockets');

class Server {
  constructor() {

    this.app = express();
    this.port = process.env.PORT || 8080;

    // http server
    this.server = http.createServer(this.app);

    // Conf sockets
    this.io = socketIo(this.server);
  }

  middleware() {
    // Middleware static dir
    this.app.use(express.static(path.resolve(__dirname, '../public')))
  }

  // Conf sockets
  confSockets() {
    new Sockets(this.io);
  }

  execute() {
    // Initialize middleware
    this.middleware();

    // Initialize sockets
    this.confSockets();

    // Initialize server
    this.server.listen(this.port, () => {
      console.log(`Server on port: ${this.port}`)
    })
  }
}

module.exports = Server;