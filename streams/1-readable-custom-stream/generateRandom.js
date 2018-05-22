const RandomStream = require('./randomStream');
const randomStream = new RandomStream();

randomStream.on('readable', function() { 
  let chunk;
  while((chunk = randomStream.read()) !== null) { 
    console.log("Chunk received: " + chunk.toString()); 
  } 
});
