"use strict";

const fs = require('fs');

/*
Factory function that creates a proxied version of the writeable object passed as argument
*/
function createLoggingWritable(writableOrig) {
  const proto = Object.getPrototypeOf(writableOrig); // Get the class of the provided object

  function LoggingWritable(writableOrig) {
    this.writableOrig = writableOrig;
  }

  LoggingWritable.prototype = Object.create(proto); // Create an instance of the class

  // Override the write method to add logging    
  LoggingWritable.prototype.write = function(chunk, encoding, callback) {
    if(!callback && typeof encoding === 'function') { // write called with write(chunk, callback)
      callback = encoding;
      encoding = undefined;
    }
    console.log('Writing ', chunk);
    return this.writableOrig.write(chunk, encoding, function() { // Invoke write of the proxied object
      console.log('Finished writing ', chunk);
      callback && callback();
    });
  };

  /* Preserve the  events on the original prototype */
  LoggingWritable.prototype.on = function() {
    return this.writableOrig.on
      .apply(this.writableOrig, arguments);
  };
  LoggingWritable.prototype.end = function() {
    return this.writableOrig.end
      .apply(this.writableOrig, arguments);
  };

  return new LoggingWritable(writableOrig);
}

const writable = fs.createWriteStream('test.txt');
const writableProxy = createLoggingWritable(writable);

writableProxy.write('First chunk');
writableProxy.write('Second chunk');
writable.write('This is not logged');
writableProxy.end();
