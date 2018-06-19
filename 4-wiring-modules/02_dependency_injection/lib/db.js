"use strict";

const level = require('level');
const sublevel = require('level-sublevel');

module.exports = function(dbName) { // <-- The db module is now a factory, wich makes the module reusable and stateless.
  return sublevel(
    level(dbName, {valueEncoding: 'json'})
  );
};
