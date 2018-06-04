"use strict";

const OfflineState = require('./offlineState');
const OnlineState = require('./onlineState');

class FailsafeSocket {
  constructor (options) {
    this.options = options;
    this.queue = []; // Queue for offline mode
    this.currentState = null;
    this.socket = null;
    /* Instantiate the state classes, save them in keys 'offline' / 'online' */
    this.states = { 
      offline: new OfflineState(this),
      online: new OnlineState(this)
    };
    this.changeState('offline');
  }

  changeState (state) { 
    console.log('Activating state: ' + state);
    this.currentState = this.states[state]; // Get the state from states['offline'] or ['online']
    this.currentState.activate();
  }

  send(data) {     
    this.currentState.send(data); // Delegate the sending behavior to the state class
  }
}

module.exports = options => {
  return new FailsafeSocket(options);
};
