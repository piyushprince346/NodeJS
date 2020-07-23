const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/') // no semi colon 
.all( (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next(); // it specifies that you have to look for further information 
}) // no semi colon 
.get((req, res, next) => { // .get is chained to dishRouter.route('/')
    res.end("Will send all the dishes to you!")
}) // no semi colon 
.post((req, res, next) => {
    res.end("Will add the dish: " + req.body.name + " with the details: " + req.body.description);
}) // no semi colon
.put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /dishes");
}) // no semi colon 
.delete((req, res, next) => {
    res.end("Deleting all the dishes!");
}); // till here is chained to .route('/')


// chaining is continued
// for /dishes/:dishid
dishRouter.route('/:dishId')
.get( (req, res, next) => {
    res.end("Will send details of the dish: " + req.params.dishId + " to you.");
})

// can't add dish within a specific dish
.post( (req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /dishes/" + req.params.dishId);
})

.put((req, res, next) => {
    // res.write() helps used in adding a line to the reply message
    res.write("Updating the dish: " + req.params.dishId + '\n');
    res.end("Will update the dish: " + req.body.name + " with the details: " + req.body.description);
})


.delete( (req, res, next) => {
    res.end("Deleting the dish: " + req.params.dishId);
});


module.exports = dishRouter;