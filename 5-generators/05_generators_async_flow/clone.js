"use strict";

const fs = require('fs');
const path = require('path');

function asyncFlow(generatorFunction) {
  
  // Will be provided as callback function to all async operations
  function callback(err) {
    if (err) { 
      return generator.throw(err); 
    }
    
    
    const results = [].slice.call(arguments, 1); // Get the arguments passed to the callback functions
    console.log('results', results)
    generator.next(results.length > 1 ? results : results[0]); // readfile will have a second arg, writeFile will not
  }
  
  // 2. Instantiate the generator function passing it the internal 
  //    callback function and start it´s execution. 
  const generator = generatorFunction(callback);
  generator.next();  
}

// 1. Main program starts here: Call the asyncFlow function and pass it a generator function
asyncFlow(function* (callback) {
  const fileName = path.basename(__filename);
  // Call the generator, passing it the result of a readfile
  const myself = yield fs.readFile(fileName, 'utf8', callback);
  // const myself = yield (() => {null,'hello'})
  yield fs.writeFile(`clone_of_${fileName}`, myself, callback);
  yield fs.writeFile(`another_file.txt`, 'foobarbaz', callback);
  console.log('Clone created');
});
