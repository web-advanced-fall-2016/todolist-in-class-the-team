const http = require('http');
const express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var path = require('path');
var db = require ('./db.js')
const port = process.env.PORT || 3000;
var urlencodedParser = bodyParser.urlencoded({extended: false})

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
//

app.use(function(req, res, next){ //app receives a request when the browser open
	console.log('connect to the server')
	next();
});

app.use('/test' , function(req,res){
  res.json({message:"success"});
} );

app.get('/initial' , function(req,res){
	let initialData = db.getItemList();
	res.json(initialData);
	console.log(initialData);
	db.items = initialData;
});


app.post('/addItem', function(req, res){
   console.log(req.body);
   db.items.push(req.body);
   console.log(db.items);
   res.json(db.items);
   db.saveItemList(db.items);
   console.log("db is" + db.items)
});

app.post('/closeItem', function(req, res){
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
  console.log (item.id);
  console.log (id);
  if (item.id == parseInt(id)) {
    console.log ("thing to get rid of is: " + item);
    let index = db.items.indexOf(item);
    console.log("the index is: " + index);
    db.items.splice(index, 1);
    console.log("new index is: " + index);
    
  }
}


console.log("DB" + db.items);
}

app.listen(port);
console.log('working from the port ' + port);