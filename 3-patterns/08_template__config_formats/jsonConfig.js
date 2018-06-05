"use strict";

const util = require('util');
const ConfigTemplate = require('./configTemplate');

/*
Sample implementation for ConfigTemplate class. Provides implementations of stub methods.
*/
class JsonConfig extends ConfigTemplate {

  _deserialize (data) {
    return JSON.parse(data);
  };

  _serialize (data) {
    return JSON.stringify(data, null, '  ');
  }
}

module.exports = JsonConfig;
