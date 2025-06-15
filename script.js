document.addEventListener('DOMContentLoaded', () => {
  // Select DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Function to add a task
  function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
      alert('Please enter a task');
      return;
    }

    // Create list item
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    // Remove task on click
    removeBtn.onclick = () => {
      taskList.removeChild(li);
    };

    // Append remove button to li and li to task list
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Clear input field
    taskInput.value = '';
  }

  // Add event listener for the button click
  addButton.addEventListener('click', addTask);

  // Add event listener for "Enter" key press in input field
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false));
  }

  function addTask(taskText, save = true) {
    if (typeof taskText !== 'string') {
      taskText = taskInput.value.trim();
    }
    if (taskText === '') {
      alert('Please enter a task');
      return;
    }
    const li = document.createElement('li');
    li.textContent = taskText;
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';
    removeBtn.onclick = () => {
      taskList.removeChild(li);
      updateLocalStorage();
    };
    li.appendChild(removeBtn);
    taskList.appendChild(li);
    if (save) {
      taskInput.value = '';
      updateLocalStorage();
    }
  }

  function updateLocalStorage() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
      tasks.push(li.firstChild.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  addButton.addEventListener('click', () => addTask());
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  loadTasks();
});
