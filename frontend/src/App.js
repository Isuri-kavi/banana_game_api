import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import "./App.css";

// Pages
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Header() {
  const location = useLocation();

  // Hide navbar on Home page
  if (location.pathname === "/") {
    return null;
  }

  return (
    <header>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">Game</Link>
          <ul className="navbar-links">
            <li>
              <Link to="/login" className="navbar-link">Login</Link>
            </li>
            <li>
              <Link to="/register" className="navbar-link">Register</Link>
            </li>
            <li className="navbar-game">
              <Link to="/game" className="navbar-link">Game</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default App;
