"use strict";

const level = require('level');
const sublevel = require('level-sublevel');

// Create connection to db and export the handle
module.exports = sublevel(
  level('example-db', {valueEncoding: 'json'})
);
