var rect = require('./rectangle')
function solveRec(l,b){
    console.log("Solving for rectangle with l = " + l + " and b = " + b);
    
    rect(l,b,(err,rectangle) => {
        if(err){
            console.log("ERROR: ",err.message);
        }
        else{
            console.log("The area of rectangle having dimensions l = " + l + " and b = " + b + " is " + rectangle.area());
            console.log("The perimeter of rectangle having dimensions l = " + l + " and b = " + b + " is " + rectangle.perimeter());
        }
    })

    console.log("This statement is after the call to rect()");
}

solveRec(2,4);
solveRec(-2,7);
solveRec(3,5);
solveRec(0,5);
