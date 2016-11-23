var baseURL = "http://localhost:3000";
console.log('start');
var initialItems = [];
var updateList = [];
let listOne = document.getElementById("one");
var newItem;

window.onload = function() {
    getInitialItems();
    testConnection();
};



function getInitialItems(){
    $.ajax({
        method:"GET",
        url: baseURL + `/initial`
    }).done(function(res){
        console.log('Initial Items.');
        console.log(res);
         for (i=0; i< res.length; i++) {
            console.log(res[i]);
            initialItems.push(res[i]);
         }
         createList();
         createCloseButton();
    })
};

function testConnection(){
    $.ajax({
        method:"GET",
        url: baseURL + `/test`
    }).done(function(res){
        console.log("Test result is" + res.message);
    })
};

function addItem(data){
        $.ajax({
        method:"POST",
        url: baseURL + `/addItem`,
        data: data
    }).done(function(res){
        console.log(data + " was sent to server");
        console.log("The result is " + res);
        refreshList(res);
});
}

function deleteFromServer(id){
    $.ajax({
        method:"POST",
        url: baseURL + `/closeItem`,
        data: {"id":id}
    }).done(function(res){
        console.log(id + "was sent to server");
        refreshList(res);
    });
}

function createList() {
    console.log("creatinglist...");
    var list = document.querySelector('ul');
    // var li = document.createElement('li');
    for (item of initialItems) {
        list.innerHTML += "<li id=' " + item.id + "'>" + item.name + "</li>";
    }
}

function refreshList(data){
    updateList = data;
    console.log(updateList);
    console.log("new list refresh");
    var list = document.querySelector('ul');
    list.innerHTML = "";
    for (item of updateList){
        list.innerHTML += "<li id=' " + item.id + "'>" + item.name + "</li>";
    }
    createCloseButton();
}

// function createList() {
//     console.log("creatinglist...");
//     var list = document.querySelector('ul');
//     // var li = document.createElement('li');
//     for (item of initialItems) {
//         list.innerHTML += "<li id=' " + item.id + "'>" + item.name + "</li>";
//     }
// }


function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("Input").value;
    var nextID = parseInt(document.getElementById("myUL").lastChild.id) + 1;
    console.log(nextID);
    

    if (inputValue === '') {
        alert("You must write something!");
    } else {
          newItem = { name: inputValue, id: nextID };
          addItem(newItem);
          var inputValue = '';
          console.log(nextID);
              }
}

function createCloseButton() {
var mylist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < mylist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    mylist[i].appendChild(span);
    span.addEventListener('click', function(ev) {
      if (ev.target.parentElement.nodeName === 'LI') {
        console.log(ev.target.parentElement.id);
        let currentItem = ev.target.parentElement.id;
        closeItem(currentItem);
      }
    })
}
}

function closeItem(id){
  console.log("the id of the thing to close is" + id);
  deleteFromServer(id);
}

