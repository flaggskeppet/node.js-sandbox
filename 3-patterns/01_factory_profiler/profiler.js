"use strict";

/*
Simple profiler class having a label, a state and two timer methods
*/
class Profiler {
  constructor(label) {
    this.label = label;
    this.lastTime = null;
  }

  start() {
    this.lastTime = process.hrtime(); // Start Highresolution timer
  }

  end() {
    const diff = process.hrtime(this.lastTime);
    console.log(
      `Timer "${this.label}" took ${diff[0]} seconds and ${diff[1]} nanoseconds.`
    );
  }
}

module.exports = function(label) {
  if(process.env.NODE_ENV === 'development') {
    return new Profiler(label); // In development mode we export the profiler class as is.       
  } else if(process.env.NODE_ENV === 'production') {
    return {  // In production mode we just export a mock object with two empty methods (Duck typing)           
      start: function() {},
      end: function() {}
    }
  } else {
    throw new Error('Must set NODE_ENV');
  }
};
