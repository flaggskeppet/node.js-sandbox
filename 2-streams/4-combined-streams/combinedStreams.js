"use strict";

const zlib = require('zlib');
const crypto = require('crypto');
const combine = require('multipipe'); // Library for combining streams

// Custom streams made up from combining some of the streams in the core library.
// These streams can be used a black boxes by a client
module.exports.compressAndEncrypt = password => {
  return combine(
    zlib.createGzip(),
    crypto.createCipher('aes192', password)
  );
};

module.exports.decryptAndDecompress = password => {
  return combine(
    crypto.createDecipher('aes192', password),
    zlib.createGunzip()
  );
};
