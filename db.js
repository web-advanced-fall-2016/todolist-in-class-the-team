var items = require('./todolist.json');
let fs = require('fs');

var db = {
	
getItemList: function(){
		return items;
	},

	saveItemList: ()=> {
        fs.writeFile('./todolist.json', JSON.stringify(items), (err) => {
           if (err){
            console.log('The Database did NOT update.');
            console.log('The Database is updated!');
        }
    });
    }

};

module.exports = db;