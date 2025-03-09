import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

// Pages
import TodoList from './components/TodoList';
import Login from "./Login";
import Register from "./Register";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Welcome to Todo App</h1>
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/todos">Todo List</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/todos" element={<TodoList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
