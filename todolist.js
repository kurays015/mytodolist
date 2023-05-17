const addButton = document.querySelector('.add-btn');
let todoList = [];

function displayResult() {
  let todoListHTML = '';

  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];
    const { name, dueDate } = todoObject;
    const html = `
      <div class="todo-list-container">
        <div>${name}</div>
        <div>${dueDate}</div> 
        <button class="del-btn" onclick="
          todoList.splice(${i}, 1);
          displayResult();
        ">Delete</button>
      </div>       
    `;
    todoListHTML += html;
  }
  document.querySelector('.js-display-result').innerHTML = todoListHTML;

  // Save the todoList array to local storage
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

function addTodo(e) {
  const input = document.querySelector('.my-input');
  const name = input.value;
  const inputDate = document.querySelector('.input-date');
  const dueDate = inputDate.value;

  if (input.value !== '' && inputDate.value !== '') {
    todoList.push({
      name,
      dueDate
    });
    input.value = '';
    inputDate.value = '';
    displayResult();
  }
  if (input.value === '' && inputDate.value === '') {
    input.placeholder = 'Task and Date Required!';
  } else if (inputDate.value !== '') {
    input.placeholder = 'Task Required!';
  } else if (input.value !== '') {
    input.value = '';
    input.placeholder = 'Date Required!';
  }
  e.preventDefault();
}

// Retrieve the todoList array from local storage, if it exists
const savedTodoList = localStorage.getItem('todoList');
if (savedTodoList) {
  todoList = JSON.parse(savedTodoList);
  displayResult();
}
displayResult();

addButton.addEventListener('click', addTodo);
