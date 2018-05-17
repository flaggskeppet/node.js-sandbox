var fs = require('fs');
var zlib = require('zlib');

var file = '/home/jonas/labs/somefile.txt'; //var file = process.argv[2]; 

fs.readFile(file, function(err, buffer){
    console.log('reading file ' + file);
    console.log(buffer.toString());
   
    zlib.gzip(buffer, function(err, buffer){
        fs.writeFile(file + '.gz', buffer, function(err){
            console.log('File compressed!');
        });
    });
});