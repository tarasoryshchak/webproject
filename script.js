const API_URL = 'http://localhost:3000/tasks';

// Завантаження завдань
const loadTasks = async () => {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    const container = document.getElementById('tasks-container');
    container.innerHTML = '';
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        taskElement.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <small>Assigned To: ${task.author}</small>
            <small>Due: ${new Date(task.datetime).toLocaleString()}</small>
            <button onclick="deleteTask(${task.id})">Delete</button>
            <button onclick="editTask(${task.id})">Edit</button>
        `;
        container.appendChild(taskElement);
    });
};

// Додавання завдання
document.getElementById('add-task').addEventListener('click', async () => {
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-desc').value;
    const author = document.getElementById('task-author').value;
    const datetime = document.getElementById('task-datetime').value;

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, author, datetime }),
    });

    loadTasks();
});

// Видалення завдання
const deleteTask = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    loadTasks();
};

// Редагування завдання
const editTask = async (id) => {
    const newTitle = prompt('Enter new title:');
    const newDescription = prompt('Enter new description:');
    const newAuthor = prompt('Enter new assigned person:');
    const newDatetime = prompt('Enter new due date and time (YYYY-MM-DDTHH:MM):');
    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, description: newDescription, author: newAuthor, datetime: newDatetime }),
    });
    loadTasks();
};

// Завантаження завдань при завантаженні сторінки
loadTasks();
