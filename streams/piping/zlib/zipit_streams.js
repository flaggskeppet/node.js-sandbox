var fs = require('fs');
var zlib = require('zlib');

//var file = process.argv[2];
var file = '/home/jonas/labs/somefile.txt';

fs.createReadStream(file)
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(file + '.gz'))
    .on('finish', () => {console.log('File compressed!');});