"use strict";

module.exports = () => { // The exported module is a factory function
  const dependencies = {};
  const factories = {};
  const serviceLocator = {};
  
  serviceLocator.factory = (name, factory) => { // Associate a component against a factory
    factories[name] = factory;
  };
  
  serviceLocator.register = (name, instance) => { // Associate a component directly with an instance
    dependencies[name] = instance;
  };
  
  // Retrieves a component by its name.
  // Returns instance if already available
  // This triggers the instantiation of the dependency graph.
  serviceLocator.get = (name) => {
    if (!dependencies[name]) {
      const factory = factories[name];
      // The module factories are invoked by injecting the current instance of the
      // service locator.
      /*
      The result for this example would be factories['authController'](serviceLocator)
      */
      dependencies[name] = factory && factory(serviceLocator); 
      if (!dependencies[name]) {
        throw new Error('Cannot find module: ' + name);
      }
    }
    return dependencies[name];
  };

  return serviceLocator;
};
