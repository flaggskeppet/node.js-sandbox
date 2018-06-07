"use strict";

const zmq = require('zmq');
const ZmqMiddlewareManager = require('./zmqMiddlewareManager');
const jsonMiddleware = require('./jsonMiddleware');

const request = zmq.socket('req');
request.connect('tcp://127.0.0.1:5000');

// Wrap the connected socket in the MiddlewareManager
const zmqm = new ZmqMiddlewareManager(request);

// Execute the .json() factory method on the jsonMiddleWare module
zmqm.use(jsonMiddleware.json());

// 
zmqm.use({
  inbound: function (message, next) {
    console.log('Echoed back: ', message.data);
    next();
  }
});

setInterval( () => {
  zmqm.send({action: 'ping', echo: Date.now()});
}, 1000);
