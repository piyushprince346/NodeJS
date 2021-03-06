const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const dishRouter = require('./routes/dishRouter');

const hostname = 'localhost';
const port = 3000;

const app = express() // our application is going to use express node module
app.use(morgan('dev'));
app.use(bodyParser.json());

// if request comes with /dishes go to dishRouter for further action 
app.use('/dishes',dishRouter); 






app.use(express.static(__dirname + '/public'))

app.use((req,res,next) => {
    // console.log(req.headers); -> if we are using morgan then no need to write this 
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1> This is an Express Server </h1></body></html>');

})

const server = http.createServer(app);

server.listen(port,hostname,() => {
    console.log(`Server running at http://${hostname}:${port}`);
})