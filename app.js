const http = require('http');
const express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const port = 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


var initialData = [{
        "name": "Awesome Apple Yo",
        "id": 0
    },
    {
        "name": "Bodacious Banana Man",
        "id": 1 
    },
    {
        "name": "Original Orange Friend",
        "id": 2
    },
    {
        "name": "Gargantuous Grapefruit Party",
        "id": 3
    }

];



var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
//var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
app.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
// app.get('/', function(req, res) {
//     res.json(initialData);   
// });

app.get('/api' , function(req,res,next){
	res.json(initialData);
    next();
});

app.post('/api1', function(req, res, next){
   console.log(req.body);
   initialData.push(req.body);
   console.log(initialData);
});

app.post('/close', function(req, res, next){
   console.log(req.body);
   console.log(req.body.id);
   removeItem(req.body.id);
   console.log("removing " + req.body.id);
   console.log(initialData);
});
app.get('/close', function(req,res,next){
    res.json(initialData);
    console.log(initialData);
})

function removeItem(id) {
  let tempArray = [];
 
//Using Index Of Method -- Not Quite Working
// initialData.splice(_.findIndex(initialData, function(item) {
//     return item.id === id;
// }), 1);

// //Another Try
for (item of initialData) {
  tempArray = initialData.filter(function(item) {
  return item.id != id;
});
}
initialData = tempArray;




// //WORKING POORLY - Issue with Index vs. ID
//  initialData.splice(id,1);
// console.log("removed data is " + initialData);


//Trying with Reg Exp -- DIDN"T WORK
  // if(!id) {
  //   return initialData;
  // }

  // let expression = new RegExp(id, 'i');
  // for (item of initialData) {
  //   if (expression.test(item.id)) {
  //       initialData.splice(item,1);
  //   }
  // }
  // return initialData;
  // console.log(initialData);
}


app.get('/alltasks', function(req,res,next){
    res.json(initialData);
    console.log(initialData);

    // let result = res.json;
    // initialData.push(result);
    // console.log(result);
    // console.log("testing" + initialData)
    // console.log("testing" + initialData[4]);
})


app.use('/apio' , function(req,res,next){
	res.json({message:"success"});
} );
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server running and listening at http://localhost:${port}/`);
});