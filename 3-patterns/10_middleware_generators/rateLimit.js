"use strict";

// Map for storing the calls to the server. Note how we use it with
// .has(), .get() and .set() to check and store calls
const lastCall = new Map();

module.exports = function *(next) { // The module exports a generator function

  // inbound
  const now = new Date();
  // Since the function is invoked inside an instance from koa, this refers to the current request
  if (lastCall.has(this.ip) && now.getTime() - lastCall.get(this.ip).getTime() < 1000) {
    return this.status = 429; // Too Many Requests
  }
  
  yield next; // progress to the next middleware in the list

  // outbound
  lastCall.set(this.ip, now);
  this.set('X-RateLimit-Reset', now.getTime() + 1000);
};
