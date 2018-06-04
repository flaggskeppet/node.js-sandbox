"use strict";

const fs = require('fs');
const objectPath = require('object-path');

class Config {
  constructor(strategy) { // The class takes the choses strategy in the ctor.
    this.data = {};
    this.strategy = strategy;
  }

  get(path) {
    return objectPath.get(this.data, path);
  }

  set(path, value) {
    return objectPath.set(this.data, path, value);
  }

  read(file) {
    console.log(`Deserializing from ${file}`);
    this.data = this.strategy.deserialize(fs.readFileSync(file, 'utf-8')); // Use the provided strategy
  }

  save(file) {
    console.log(`Serializing to ${file}`);
    fs.writeFileSync(file, this.strategy.serialize(this.data));
  }
}

module.exports = Config;
