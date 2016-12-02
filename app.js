const http = require('http'); //a module inside node's API. It parses a message into headers and body but it does not parse the actual headers or the body. HTTPS is a native module to node.js
const express = require('express'); //routing and middleware web framework/dependency
var path = require('path'); //module provides utilities for working with file and directory paths
var bodyParser = require('body-parser'); //middleware that parses json 
var db = require('./db.js') //adds module of a database 
const port = 3000; //listening on port 3000 

var app = express();

//use the following modules
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); //any request that came into the server serve the public folder 


// function is executed every time the app receives a request.
app.use(function(req, res, next) { //app receives a request when the browser open
    console.log('connect to the server')
    next();
});

//tests the connection 
// app.use('/test' , function(req,res){ 
//   res.json({message:"success"});
// } );

//Data that is already inside db is displayed
app.get('/initial', function(req, res) {
    let initialData = db.getItemList();
    res.json(initialData);
    console.log(initialData);
    db.items = initialData; //takes the items var from db.js 
});


app.post('/addItem', function(req, res) {
    console.log(req.body);
    db.items.push(req.body);
    console.log(db.items);
    res.json(db.items);
    db.saveItemList(db.items);
    console.log("db is" + db.items)
});

app.post('/closeItem', function(req, res) {
    removeItem(req.body.id);
    console.log("removing " + req.body.id);
    let index = db.items.indexOf(req.body.id);
    for (item of db.items) {
        console.log("The index of the items is: " + db.items.indexOf(item));
    }

    console.log(db.items);
    res.json(db.items);
    db.saveItemList(db.items);
});

function removeItem(id) {
    for (item of db.items) {
        console.log(item.id);
        console.log(id);
        if (item.id == parseInt(id)) {
            console.log("remove the following item: " + item);
            let index = db.items.indexOf(item);
            console.log("the index is: " + index);
            db.items.splice(index, 1);
            console.log("new index is: " + index);

        }
    }


    console.log("DB" + db.items);
}

app.listen(port); //go to localhost:3000
console.log('working from the port ' + port);
