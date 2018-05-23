"use strict";

const stream = require('stream');

/*
Class inheriting from the klass stream.Transform.
This class provides parallell streams with a configurable concurrency

It overrides the _transform, _flush and _onComplete methods. 
*/
class LimitedParallelStream extends stream.Transform {
  constructor(concurrency, userTransform) {
    super({objectMode: true});
    this.concurrency = concurrency;
    this.userTransform = userTransform;
    this.running = 0;
    this.terminateCallback = null;
    this.continueCallback = null;
  }

  _transform(chunk, enc, done) {
    this.running++;
    
    /*
    Invoke the custom userTransform method that is provided in the constuctor when
    instantiating the class.
    Provide push & _onComplete methods bound to the inherited class so that these can be
    invoked from the provided userTranstransform method.
    */
    this.userTransform(chunk, enc,  this.push.bind(this), this._onComplete.bind(this));
    if(this.running < this.concurrency) {
      done(); // Concurrency allows us to start a new stream. Directly invoke the done method to allow it.
    } else {
      this.continueCallback = done; // We are busy, save the done() method for later usage
    }
  }

  _flush(done) {
    if(this.running > 0) {
      this.terminateCallback = done;
    } else {
      done();
    }
  }

  // Automatically invoked one a stream is finished.
  _onComplete(err) {
    this.running--; // Decrease the number of running streams
    if(err) {
      return this.emit('error', err);
    }
    const tmpCallback = this.continueCallback;
    this.continueCallback = null;
    tmpCallback && tmpCallback();
    if(this.running === 0) {
      this.terminateCallback && this.terminateCallback();
    }
  }
}

module.exports = LimitedParallelStream;
