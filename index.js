const EventEmitter = require('node:events');
const fs = require('fs');
const http = require('node:http');
const url = require('node:url');
const eventEmitter = new EventEmitter();

eventEmitter.on('start', (num) => {
    console.log("Started", num)
});

http.createServer((req, res) => {
    let q = url.parse(req.url);
    let path = '';
    if (q.path === '/'){
        path = 'index.html';
    } else if (q.path === '/contact-me' || q.path === '/about' ){
        path = `${q.path.substring(1)}.html`;
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
