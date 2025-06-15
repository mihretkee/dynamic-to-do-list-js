document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage on page load
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Save current tasks array to localStorage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Add a task to the list and optionally save it to localStorage
    function addTask(taskText, save = true) {
        taskText = taskText.trim();
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create list item and set text
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';  // <-- no classList.add, using className

        // Remove task on button click
        removeBtn.onclick = () => {
            taskList.removeChild(li);
            if (save) {
                updateLocalStorage();
            }
        };

        // Append remove button to list item, then to task list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input
        taskInput.value = '';

        // Save to localStorage if needed
        if (save) {
            updateLocalStorage();
        }
    }

    // Update the localStorage with current tasks from the DOM
    function updateLocalStorage() {
        const tasks = [];
        for (let i = 0; i < taskList.children.length; i++) {
            // Each li's firstChild is the text (since we appended button after textContent)
            // But textContent includes all text, including "Remove", so we get only the firstChild nodeValue:
            const li = taskList.children[i];
            // To get only the task text without "Remove":
            // Use li.childNodes[0].nodeValue (text node) or li.firstChild.nodeValue
            // It may contain whitespace, so trim it
            const taskText = li.firstChild.nodeValue.trim();
            tasks.push(taskText);
        }
        saveTasks(tasks);
    }

    // Event listeners
    addButton.addEventListener('click', () => addTask(taskInput.value));
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });

    // Load stored tasks when page loads
    loadTasks();
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
