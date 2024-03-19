const EventEmitter = require('node:events');
const fs = require('fs');
const http = require('node:http');
const eventEmitter = new EventEmitter();

eventEmitter.on('start', (num) => {
    console.log("Started", num)
});

http.createServer((req, res) => {
    let path = '';
    if (req.url === '/'){
        path = 'index.html';
    } else if (req.url === '/contact-me'){
        path = 'contact-info.html'
    } else if (req.url === '/about'){
        path = 'about.html';
    } else {
        path = '404.html';
    }

    fs.readFile(path, 'utf8', (err, data) => {
        if (err){
            res.end('Error: ', err);
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
}).listen(8080);

eventEmitter.emit('start', 5);
