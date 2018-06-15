"use strict";

const app = require('koa')();

app.use(require('./rateLimit')); // Register the middleware

// Pass a generator function to the middleware
app.use(function *(){
  this.body = {"now": new Date()};
});

app.listen(3000);