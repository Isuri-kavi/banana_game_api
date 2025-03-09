const express = require('express');
const router = express.Router();

// Mock data (you will use a database in real-world applications)
let todos = [
  { id: 1, task: 'Learn Express', completed: false },
  { id: 2, task: 'Build Todo App', completed: false }
];


// Get all todos
router.get('/', (req, res) => {  // Removed authentication check for testing
  res.json(todos);
});

// Add a new todo
router.post('/', (req, res) => {  // Removed authentication check for testing
  const { task } = req.body;

  // Validation: Ensure task is provided
  if (!task) {
    return res.status(400).json({ message: 'Task is required' });
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
router.get('/:id', (req, res) => {  // Removed authentication check for testing
  const { id } = req.params;
  const todo = todos.find(todo => todo.id === parseInt(id));
  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  res.json(todo);
});

// Update a todo's completion status
router.put('/:id', (req, res) => {  // Removed authentication check for testing
  const { id } = req.params;
  const { completed } = req.body;  // Allow the user to set the completion status explicitly
  const todo = todos.find(todo => todo.id === parseInt(id));

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  // If `completed` is provided in the body, update the completion status
  if (completed !== undefined) {
    todo.completed = completed;
  } else {
    // Toggle completion if no value is provided
    todo.completed = !todo.completed;
  }
  
  res.json(todo);
});

// Delete a todo
router.delete('/:id', (req, res) => {  // Removed authentication check for testing
  const { id } = req.params;
  todos = todos.filter(todo => todo.id !== parseInt(id));
  res.status(204).send();  // No content after deletion
});

module.exports = router;
