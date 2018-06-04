"use strict";

/* 
Nifty lib for sending json objects over tcp connection. Instead of using a raw tcp connection.
*/
const jot = require('json-over-tcp');   

/*
Class representing the offline state.
Note that the class takes an instance of the FailSafeSocket. This because the
state classes both need to access things like the queue and the socket in FailSafeSocket.
*/
module.exports = class OfflineState {

  constructor (failsafeSocket) { // 
    this.failsafeSocket = failsafeSocket; 
  }

  /*
  Since we are in offline mode, sending just means queuing up all data
  */
  send(data) {     
    this.failsafeSocket.queue.push(data); 
  }

  /*
  One call to this method makes the class try establishing a connection every 500ms.
  When successing change the state on FailsafeSocket to online.
  */
  activate() {
    console.log("Running activate...");     
    const retry = () => {
      setTimeout(() => this.activate(), 500); // Every call sets up a recursive call after 500ms
    };

    this.failsafeSocket.socket = jot.connect(
      this.failsafeSocket.options,
      () => {
        this.failsafeSocket.socket.removeListener('error', retry);
        this.failsafeSocket.changeState('online');
      }
    );
    this.failsafeSocket.socket.once('error', retry);
  }
};
