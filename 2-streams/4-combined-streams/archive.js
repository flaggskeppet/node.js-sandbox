"use strict";

const fs = require('fs');
const combine = require('multipipe'); // Library for combining streams
const compressAndEncryptStream = require('./combinedStreams').compressAndEncrypt;

// process.argv[2]: path to file
// process.argv[3]: password

// Use combine to compine our custom streams with a regular writestream
combine(
  fs.createReadStream(process.argv[3])
    .pipe(compressAndEncryptStream(process.argv[2]))
    .pipe(fs.createWriteStream(process.argv[3] + ".gz.enc"))
).on('error', err => {
    // Combine all streams and catch all errors in error listener here.
    // This error may come from any stream in the pipeline
    console.log(err);
  })
;
