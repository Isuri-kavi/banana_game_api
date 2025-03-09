const express = require('express');
const router = express.Router();

// Mock data (in real-world applications, you'd use a database)
let todos = [
  { id: 1, task: 'Learn Express', completed: false },
  { id: 2, task: 'Build Todo App', completed: false }
];

// Helper function to validate task input
const validateTask = (task) => {
  return task && typeof task === 'string' && task.trim().length > 0;
};

// Get all todos
router.get('/', (req, res) => {
  res.json(todos);
});

// Add a new todo
router.post('/', (req, res) => {
  const { task } = req.body;

  // Validate input
  if (!task || !validateTask(task)) {
    return res.status(400).json({ message: 'Invalid task, it must be a non-empty string.' });
  }

  const newTodo = {
    id: todos.length + 1,
    task,
    completed: false
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Get a single todo by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const todo = todos.find(todo => todo.id === parseInt(id));

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  res.json(todo);
});

// Update a todo's completion status
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  // Validate completion status
  if (completed === undefined || typeof completed !== 'boolean') {
    return res.status(400).json({ message: 'Completed status must be a boolean value.' });
  }

  const todo = todos.find(todo => todo.id === parseInt(id));

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  todo.completed = completed;
  res.json(todo);
});

// Delete a todo by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex(todo => todo.id === parseInt(id));

  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  todos.splice(todoIndex, 1);
  res.status(204).send(); // No content after deletion
});

module.exports = router;
