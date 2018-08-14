const http = require("http");
const fs = require("fs");
const zlib = require("zlib");
const path = require("path");
const file = process.argv[2];
const server = process.argv[3];

const options = {
    hostname: server,
    port: 3000,
    path: '/',
    method: 'PUT',
    headers: {
        filename: path.basename(file),
        'Content-Type': 'application/octet-stream',
        'Content-Encoding': 'gzip'
    }
};

const req = http.request(options, function(result){
    console.log('Server response: ' + result.statusCode);
});

fs.createReadStream(file)
    .pipe(zlib.createGzip())
    .pipe(req)
    .on('finish', function(){
        console.log('File sucessfully sent')
    });