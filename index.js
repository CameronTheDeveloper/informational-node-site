const EventEmitter = require('node:events');
const fs = require('fs');
const http = require('node:http');
const eventEmitter = new EventEmitter();

eventEmitter.on('start', (num) => {
    console.log("Started", num)
});

http.createServer((req, res) => {
    fs.readFile('index.html', 'utf8', (err, data) => {
        if (err){
            res.end('Error: ', err);
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data)
    });
}).listen(8080);

eventEmitter.emit('start', 5);
