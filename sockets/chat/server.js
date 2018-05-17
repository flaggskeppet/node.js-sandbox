const server = require('net').createServer();

let counter = 0;
let sockets = {};
server.on('connection', socket => {
    console.log("Client connected.");
    socket.write("Welcome to the chat\n");
    socket.id = counter ++;
    sockets[socket.id] = socket;

    socket.on('data', data => {

        Object.entries(sockets).forEach(([, cs])=>{
            cs.write(`${socket.id}: `);
            cs.write(data);
        });
    });

    socket.on('end', () => console.log('Client disconnected'));
    socket.setEncoding('utf-8');
});

server.listen(8000, () => console.log("Server bound"));