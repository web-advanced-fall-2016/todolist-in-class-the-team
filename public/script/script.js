(function() {
    let baseURL = 'http://localhost:3000';
    if (document.readyState != "loading") {
        app();
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            app();
        }, false);
    }

    function getTasks() {
        let config = {
            method: 'GET',
            headers: new Headers({}),
        };

        let request = new Request(`${baseURL}/alltasks`, config);
        fetch(request)
            .then(function(res) {
                if (res.status == 200)
                    return res.json();
                else
                    throw new Error('Something went wrong on api server!');
            })
            .then(function(res) {
                for (let task of res) {
                    let request = new Request(`${baseURL}/alltasks/${task.id}`, config);
                    fetch(request)
                        .then(function(res) {
                            if (res.status == 200)
                                return res.json();
                            else
                                throw new Error('Something went wrong on api server!');
                        })
                        .then(function(res) {
                            updateTasks(res);
                        })
                        .catch(function(err) {
                            console.warn(`Couldn't fetch tasks!`);
                            console.log(err);
                        });
                }
            })
            .catch(function(err) {
                console.warn(`Couldn't fetch tasks list`);
                console.log(err);
            });

let addBtn = document.getElementById('addBtn');
let list = document.getElementById('myToDoList');

function updateTasks(res){
    var taskListHolding = document.getElementById('taskList');
    taskListHolding.innerHTML='';
    for(let i = 0; i < res.length; i++){
			var count = i;
			var newTask = document.createElement('div');
			newTask.className = "tasks";
			newTask.id=i;
			list.appendChild(newTask);

			var taskContent = document.createElement('li');
			taskContent.innerHTML = res[i].taskContent;

            var deleteButton = document.createElement('button');
            deleteButton.id = 'deleteButton';
            deleteButton.innerText='X'; 
    
            deleteButton.addEventListener('click', function(e){
            e.preventDefault();
            deleteTask(e);

			newTask.appendChild(taskContent);
			newTask.appendChild(deletedButton);
            taskListHolding.appendChild(newTask);
            document.getElementById("myToDoList").appendChild(taskListHolding);
		}

	}

var deleteTask = function(e){
  var taskNumber = e.target.parentElement.id;   
//   "How to make it update to server?"
  response.splice(taskNumber, 1);
  updateTasks(); 
};


function saveTodo(){
    var inputValue = document.getElementById("myInput").value;
    
    if (inputValue === '') {
        alert("You must write something!");
    } else {
          newItem = { name: inputValue, id: nextID };
          addItem(newItem);
          console.log(nextID);
    }
    updateTasks();
};