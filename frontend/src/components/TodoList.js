import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  
  // Fetch todos from backend when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/api/todos')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      });
  }, []);
  
  // Add a new todo
  const addTodo = () => {
    if (newTask.trim()) {
      axios.post('http://localhost:5000/api/todos', { task: newTask })
        .then(response => {
          setTodos([...todos, response.data]);
          setNewTask('');
        })
        .catch(error => {
          console.error('Error adding todo:', error);
        });
    } else {
      alert('Please enter a task');
    }
  };

  // Toggle the completion status of a todo
  const toggleTodo = (id) => {
    axios.put(`http://localhost:5000/api/todos/${id}`)
      .then(response => {
        setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
      })
      .catch(error => {
        console.error('Error toggling todo:', error);
      });
  };

  // Delete a todo
  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
      })
      .catch(error => {
        console.error('Error deleting todo:', error);
      });
  };

  return (
    <div>
      <h2>Todo List</h2>

      {/* Add New Task */}
      <div>
        <input 
          type="text" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
          placeholder="Add a new task" 
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>

      {/* Display Todos */}
      <ul>
        {todos.length === 0 ? (
          <li>No tasks available</li>
        ) : (
          todos.map(todo => (
            <li key={todo.id}>
              <span 
                onClick={() => toggleTodo(todo.id)} 
                style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
              >
                {todo.task}
              </span>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoList;
