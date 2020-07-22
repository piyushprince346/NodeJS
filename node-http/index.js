const http = require('http');
const fs = require('fs') // Node. js includes fs module to access physical file system. The fs module is responsible for all the asynchronous or synchronous file I/O operations
const path = require('path') // Node. js path module is used for handling and transforming file paths. This module can be imported using the following syntax. var path = require("path")

const hostname = 'localhost';
const port = 3000;

// req -> request, res -> response
const server = http.createServer((req,res) => {
    console.log("Request for " + req.url + " by the method " + req.method);

    if(req.method == 'GET'){
        var fileURL;

        if(req.url == '/'){
            fileURL = '/index.html';
        }
        else{
            fileURL = req.url;
        }

        var filepath = path.resolve('./public' + fileURL);
        const fileExt = path.extname(filepath);
        
        if(fileExt == '.html'){
            fs.exists(filepath,(exists) => {
                if(!exists){
                    res.statusCode = 404;
                    res.setHeader('Content-Type','text/html');
                    res.end('<html><body><h1>Error 404 : ' + fileURL + ' not found </h1></body></html>')
                    return;
                }
                else{
                    res.statusCode = 200;
                    res.setHeader('Content-Type','text/html');
                    fs.createReadStream(filepath).pipe(res);
                }
            })
        }
        else{
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><h1>Error 404 : ' + fileURL + ' not an HTML file </h1></body></html>')
            return;
        }


    }
    else{
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Error 404 : ' + req.method + ' not supported </h1></body></html>')
        return;
    }

    
})

server.listen(port,hostname,() => {
    console.log(`Server running at http://${hostname}:${port}`);
})