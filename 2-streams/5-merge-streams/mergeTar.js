"use strict";

const tar = require('tar');
const fstream = require('fstream'); // Nifty lib for creating object streams from filesystem files
const path = require('path');

const destination = path.resolve(process.argv[2]);
const sourceA = path.resolve(process.argv[3]);
const sourceB = path.resolve(process.argv[4]);

// Initalize a stream and pipe it to its destination 
const pack = tar.Pack();
pack.pipe(fstream.Writer(destination));

/*
Let the onEnd eventhandler keep track of how many streams that have been completed.
Close the stream when both sources are read completely.
*/
let endCount = 0;
function onEnd() {
  if(++endCount === 2) {
    pack.end();
  }
}

// Use the fstream lib to create streams reading from the two source directories. 
// Attach the onEnd listener to both streams.
const sourceStreamA = fstream.Reader({type: "Directory", path: sourceA}).on('end', onEnd);
const sourceStreamB = fstream.Reader({type: "Directory", path: sourceB}).on('end', onEnd);

// Pipe both streams into the pack stream and disable auto-ending for them.
sourceStreamA.pipe(pack, {end: false});
sourceStreamB.pipe(pack, {end: false});
