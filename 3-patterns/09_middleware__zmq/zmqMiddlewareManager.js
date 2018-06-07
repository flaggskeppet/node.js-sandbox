"use strict";

module.exports = class ZmqMiddlewareManager {
  constructor(socket) {
    this.socket = socket;
    // Lists for middleware functions to handle inbound- & outbound messages.
    this.inboundMiddleware = [];           
    this.outboundMiddleware = [];
    
    // Start listening for new messages on the socket. 
    socket.on('message', message => {       
      // Process the INBOUND messages by executing the inbound middleware pipeline.
      this.executeMiddleware(this.inboundMiddleware, {
        data: message
      });
    });
  }

  // Execute middleware when a new message is sent through the socket
  send(data) {
    const message = {
      data: data
    };

    // Process the OUTBOUND message using the filters in outboundMiddleware list and pass the message to the socket.
    this.executeMiddleware(this.outboundMiddleware, message,
      () => {
        this.socket.send(message.data);
      }
    );
  }

  // Append new middleware to the pipelines.
  use(middleware) {
    if (middleware.inbound) {
      this.inboundMiddleware.push(middleware.inbound);
    }
    if (middleware.outbound) {
      this.outboundMiddleware.unshift(middleware.outbound);
    }
  }

  // Execute all middleware functions
  executeMiddleware(middleware, arg, finish) {
    function iterator(index) {
      if (index === middleware.length) {
        return finish && finish();
      }
      
      // Executes a middlewarefunction. They all receive the same arguments
      middleware[index].call(this, arg, err => {
        if (err) {
          return console.log('There was an error: ' + err.message);
        }
        iterator.call(this, ++index);
      });
    }

    iterator.call(this, 0);
  }
};
