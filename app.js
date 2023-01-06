//Selector
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
todoList.addEventListener('click', editTodo);

//Functions

function addTodo(event){
  //Prvent form fron submitting
  event.preventDefault();
  //Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create LI
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  //add todo to localstorage
  saveLocalTodos(todoInput.value);
  //check mark button
  const completeButton = document.createElement('button');
  completeButton.innerHTML = '<i class="fas fa-check"></i>';
  completeButton.classList.add("complete-btn");
  todoDiv.appendChild(completeButton);
  //check trash button
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //check edit button
  const editButton = document.createElement('button');
  editButton.innerHTML = '<i class="fas fa-edit"></i>';
  editButton.classList.add("edit-btn");
  todoDiv.appendChild(editButton);
  //APPEND TO LIST
  todoList.appendChild(todoDiv);
  //clear todo input value
  todoInput.value = "";
}

function deleteCheck(e){
  const item = e.target;
  //delete todo
  if(item.classList[0] === "trash-btn"){
    const todo = item.parentElement;
    //animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', function() {
      todo.remove();
    });

  }
  //check mark
  if(item.classList[0] === "complete-btn"){
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo){
    switch(e.target.value){
      case "all":
        todo.style.display = 'flex';
        break;
      case "completed":
        if(todo.classList.contains('completed')){
          todo.style.display = 'flex';
        }else{
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if(!todo.classList.contains('completed')){
          todo.style.display = 'flex';
        }else{
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo){
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function(todo){
    //Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create LI
  const newTodo = document.createElement('li');
  newTodo.innerText = todo;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  
  //check mark button
  const completeButton = document.createElement('button');
  completeButton.innerHTML = '<i class="fas fa-check"></i>';
  completeButton.classList.add("complete-btn");
  todoDiv.appendChild(completeButton);
  //check trash button
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");  
  todoDiv.appendChild(trashButton);
  //check edit button
  const editButton = document.createElement('button');
  editButton.innerHTML = '<i class="fas fa-edit"></i>';
  editButton.classList.add("edit-btn");
  todoDiv.appendChild(editButton);
  //APPEND TO LIST
  todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo){
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos",JSON.stringify(todos));
}
function editTodo(e) {
  const item = e.target;
  if(item.classList[0] === "edit-btn"){
    const todo = item.parentElement;
    // Get the to-do text
    const todoText = todo.firstChild.innerText;
    // Create an input field for the new to-do text
    const inputField = document.createElement("input");
    inputField.value = todoText;
    inputField.classList.add("todo-input");
    // Replace the to-do text with the input field
    todo.firstChild.innerText = "";
    todo.firstChild.appendChild(inputField);
    // Focus the input field
    inputField.focus();
    // Add a "submit" event listener to the input field
    inputField.addEventListener("keyup", function(event) {
      if(event.keyCode === 13) {
        // Get the new to-do text from the input field
        const newTodoText = inputField.value;
        // Update the to-do text
        todo.firstChild.innerText = newTodoText;
        // Update the to-do item in local storage
        updateLocalTodos(todoText, newTodoText);
      }
    });
  }
}

function updateLocalTodos(oldTodo, newTodo) {
  let todos = JSON.parse(localStorage.getItem('todos'));
  // Find the index of the old to-do item
  const todoIndex = todos.indexOf(oldTodo);
  // Replace the old to-do item with the new one
  todos[todoIndex] = newTodo;
  localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo(event){
  //Prvent form fron submitting
  event.preventDefault();
  // Check if the to-do input field is empty
  if(todoInput.value.trim() === "") {
    return;
  }
  //Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create LI
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  //add todo to localstorage
  saveLocalTodos(todoInput.value);
  //check mark button
  const completeButton = document.createElement('button');
  completeButton.innerHTML = '<i class="fas fa-check"></i>';
  completeButton.classList.add("complete-btn");
  todoDiv.appendChild(completeButton);
  //check trash button
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //check edit button
  const editButton = document.createElement('button');
  editButton.innerHTML = '<i class="fas fa-edit"></i>';
  editButton.classList.add("edit-btn");
  todoDiv.appendChild(editButton);
  //APPEND TO LIST
  todoList.appendChild(todoDiv);
  //clear todo input value
  todoInput.value = "";
}