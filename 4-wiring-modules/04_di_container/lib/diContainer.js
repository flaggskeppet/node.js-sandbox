"use strict";

const fnArgs = require('parse-fn-args'); // Nifty lib for extracting names of argument of functions

module.exports = () => {
  const dependencies = {};
  const factories = {};
  const diContainer = {};
  
  diContainer.factory = (name, factory) => {
    factories[name] = factory;
  };
  
  diContainer.register = (name, dep) => {
    dependencies[name] = dep;
  };
  
  diContainer.get = (name) => {
    if (!dependencies[name]) {
      const factory = factories[name];
      dependencies[name] = factory && diContainer.inject(factory); // This is the crucial part of the Di usage.
      if (!dependencies[name]) {
        throw new Error('Cannot find module: ' + name);
      }
    }
    return dependencies[name];
  };
  
  // This method is what makes the DI container different from the Service Locator
  diContainer.inject = (factory) => {
    const args = fnArgs(factory) // Extract the argument list from the factory function
      .map(function(dependency) { 
        // Map each argument name to its dependency instance
        return diContainer.get(dependency);
      });
    return factory.apply(null, args); // Invoke the factory function with the dependency list
  };
  
  return diContainer;
};
