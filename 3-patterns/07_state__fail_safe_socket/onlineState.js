"use strict";

module.exports = class OnlineState {
  constructor(failsafeSocket) {
    this.failsafeSocket = failsafeSocket;
  }

  send (data) {     
    // Write to the socket in the FailSafeSocket class
    this.failsafeSocket.socket.write(data);
  };

  activate() {     
    // Get everything in the queue and write 
    this.failsafeSocket.queue.forEach(data => {
      this.failsafeSocket.socket.write(data);
    });
    this.failsafeSocket.queue = [];

    // Change state in FailSafeSocket when error occurs
    this.failsafeSocket.socket.once('error', () => {
      this.failsafeSocket.changeState('offline');
    });
  }
};
