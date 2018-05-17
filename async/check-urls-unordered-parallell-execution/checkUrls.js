const fs = require('fs');
const split = require('split');
const request = require('request');
const ParallelStream = require('./parallelStream');

fs.createReadStream(process.argv[2]) //[1]
  .pipe(split()) //[2]
  .pipe(new ParallelStream((url, enc, push, done) => { //[3]
    if(!url) return done();
      request.head(url, (err, response) => {
      push(url + ' is ' + (err ? 'down' : 'up') + '\n'); // Pushing to the stream using writeable.push
      done();
    });
  }))
  .pipe(fs.createWriteStream('results.txt')) // Piping out everything we have pushed to the stream
  .on('finish', () => console.log('All urls were checked'));