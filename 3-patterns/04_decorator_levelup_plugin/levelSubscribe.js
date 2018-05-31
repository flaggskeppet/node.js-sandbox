"use strict";

module.exports = function levelSubscribe(db) { // Factory function taking a db-instance
  // Decorate the db object with a new method taking a pattern and a callback function
  db.subscribe = (pattern, listener) => {       
     db.on('put', (key, val) => {         // Listen for put events on the db object
      const match = Object.keys(pattern).every(
        k => (pattern[k] === val[k])     // Pattern matching
      );
      
      if(match) {
        listener(key, val);            // Trigger the callback function if matching
      }
    });
  };
  return db;
};
