const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Зберігання завдань у пам'яті
let tasks = [];

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Отримати всі завдання
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Додати нове завдання
app.post('/tasks', (req, res) => {
    const { title, description, author, datetime } = req.body;
    const newTask = { id: Date.now(), title, description, author, datetime };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Редагувати завдання
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, author, datetime } = req.body;
    const taskIndex = tasks.findIndex(task => task.id == id);
    if (taskIndex !== -1) {
        tasks[taskIndex] = { id: Number(id), title, description, author, datetime };
        res.json(tasks[taskIndex]);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Видалити завдання
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(task => task.id != id);
    res.status(200).json({ message: 'Task deleted successfully' });
});

// Запуск серверу
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
