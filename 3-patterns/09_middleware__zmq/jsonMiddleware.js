"use strict";

/*
Implementation of a middleware that serialized and deserializes json messages
Note that the middleware is a factory: it´s a function that returns an object with the
two middleware functions.
*/
module.exports.json = () => {
  return {
    // Serializes the message received as input and assigns the result back to the data property of message,
    // allowing further processing along the pipeline.
    inbound: function (message, next) {
      message.data = JSON.parse(message.data.toString());
      next();
    },
    outbound: function (message, next) {
      message.data = new Buffer(JSON.stringify(message.data));
      next();
    }
  }
};
