"use strict";

const profiler = require('./profiler');

function getRandomArray(len) {
  /*  Client just uses the Profiler and does not have to know 
      anything about its mock representation */
  const p = profiler(`Generating a ${len} items long array`); 
  p.start();
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(Math.random());
  }
  p.end();
}

getRandomArray(1e7);
console.log('Done');
