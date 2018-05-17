var fetch = require('node-fetch');

// fetch('https://jsonplaceholder.typicode.com/posts/1')
//   .then(response => response.json())
//   .then(json => console.log(json))

// Using async

async function handler (req, res) {
    let response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const json = await response.json();
    console.log(json.body);
  }

handler();
    
