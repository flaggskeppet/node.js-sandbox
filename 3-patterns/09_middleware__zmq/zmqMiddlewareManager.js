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

    // When sending process the OUTBOUND message using the filters in outboundMiddleware 
    // list. The last argument is the finish function.
    this.executeMiddleware(this.outboundMiddleware, message,
      () => {
        this.socket.send(message.data);
      }
    );
  }

  // Append new middleware to the pipelines.
  use(middleware) {
    if (middleware.inbound) {
      this.inboundMiddleware.push(middleware.inbound); // Append inbound function to the array
    }
    if (middleware.outbound) {
      this.outboundMiddleware.unshift(middleware.outbound); // Prepend outbound function to the array
    }
  }

  // Execute all middleware functions and the finish function at last
  executeMiddleware(middleware, arg, finish) {
    function iterator(index) { // Internal function
      if (index === middleware.length) {
        return finish && finish(); 
      }
      
      // Executes a middleware function. They all receive the same arguments
      // wich is a way to propagate data from one middleware to the next.
      middleware[index].call(this, arg, err => {
        if (err) {
          return console.log('There was an error: ' + err.message);
        }
        iterator.call(this, ++index);
      });
    }

    iterator.call(this, 0); // Start off by calling the internal function at first index.
  }
};
