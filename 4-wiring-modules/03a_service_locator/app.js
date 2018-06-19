"use strict";

const Express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const http = require('http');

const app = module.exports = new Express();
app.use(bodyParser.json());

const svcLoc = require('./lib/serviceLocator')(); // Invoke the factory method of the service locator

svcLoc.register('dbName', 'example-db');
svcLoc.register('tokenSecret', 'SHHH!');
svcLoc.factory('db', require('./lib/db'));
svcLoc.factory('authService', require('./lib/authService'));
svcLoc.factory('authController', require('./lib/authController'));

// This triggers the instantiation of the dependency graph.
// When we ask for an instance of the authController the factory will
// inject an instance of itself. (... '&& factory(serviceLocator)')
const authController = svcLoc.get('authController');

app.post('/login', authController.login);
app.get('/checkToken', authController.checkToken);

app.use(errorHandler());
http.createServer(app).listen(3000, () => {
  console.log('Express server started');
});
