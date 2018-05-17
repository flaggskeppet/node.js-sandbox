var stream = require('stream');
var util = require('util');

// This Parallellstream is a real class extending stream.Transform
// Note the usage of super in the ctor.

class ParallelStream extends stream.Transform {
  constructor(userTransform) {
    super({objectMode: true});
    this.userTransform = userTransform;
    this.running = 0;
    this.terminateCallback = null;
  }
  
  
  _transform(chunk, enc, done) {
      this.running++;
      this.userTransform(chunk, enc, this.push.bind(this), this._onComplete.bind(this));
      done(); // Dont bother waiting for userTransform to be finished, instead run in parallell.
    }
    
    
  _onComplete(err, chunk) {
    this.running--;
    if(err) {
      return this.emit('error', err);
    }
    if(this.running === 0) {
      this.terminateCallback && this.terminateCallback(); // Will end the stream
    }
  }
    
  _flush(done) { // Will be invoked right before the stream terminates 
    if(this.running > 0) {
      this.terminateCallback = done;
    } else {
      done();
    }
  }
}

module.exports = ParallelStream;

