// Select elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const categorySelect = document.getElementById('categorySelect');
const prioritySelect = document.getElementById('prioritySelect');
const dueDateInput = document.getElementById('dueDateInput');

// Load tasks from localStorage
window.onload = loadTasks;

// Add task
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();
    const category = categorySelect.value;
    const priority = prioritySelect.value;
    const dueDate = dueDateInput.value;

    if (taskText === '') return;

    const task = {
        text: taskText,
        category,
        priority,
        dueDate,
        completed: false
    };

    saveTask(task);
    renderTask(task);
    taskInput.value = '';
}

function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks') || '[]');
}

function loadTasks() {
    const tasks = getTasks();
    tasks.forEach(renderTask);
}

function renderTask(task) {
    const li = document.createElement('li');
    if (task.completed) {
        li.classList.add('completed');
    }

    li.innerHTML = `
        <span>${task.text}</span>
        <span class="category ${task.category}">${task.category}</span>
        <span class="priority ${task.priority}">${task.priority}</span>
        <span class="dueDate">${task.dueDate}</span>
        <button class="deleteBtn">Delete</button>
    `;

    li.querySelector('.deleteBtn').addEventListener('click', () => {
        li.remove();
        deleteTask(task);
    });

    li.addEventListener('click', () => {
        li.classList.toggle('completed');
        task.completed = !task.completed;
        updateTask(task);
    });

    taskList.appendChild(li);
}

function deleteTask(taskToDelete) {
    const tasks = getTasks().filter(task => task.text !== taskToDelete.text);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTask(updatedTask) {
    const tasks = getTasks().map(task => task.text === updatedTask.text ? updatedTask : task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
