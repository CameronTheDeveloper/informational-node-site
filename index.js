const EventEmitter = require('node:events');
const fs = require('fs');
const http = require('node:http');
const https = require('https');
let data1 = null;

const eventEmitter = new EventEmitter();
eventEmitter.on('start', (num) => {
    console.log("Started", num)
});


http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data1);
    res.end('Done');
}).listen(8080);

eventEmitter.emit('start', 5);

fs.appendFile('testing.txt', 'Test File', err => {
    if (err){
        return console.log(err)
    }
});

fs.readFile('testing.txt', 'utf8', (err, data) => {
    if (err){
        console.log(err);
        return;
    }
    data1 = data;
    console.log(data);
});