import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import "./App.css";

// Pages
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import LoginPage from "./Pages/LoginPage";  // Adjust path if needed
import GamePage from './Pages/GamePage'; // Correct path
import Leaderboard from './components/Leaderboard';  // Adjust path if needed


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
            <Route path="/game" element={<GamePage />} />
            <Route path="/loginpage" element={<LoginPage />} /> {/* Add LoginPage route */}
            <Route path="/leaderboard" element={<Leaderboard />} /> {/* Add Leaderboard route */}
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
            <li className="navbar-leaderboard">
              <Link to="/leaderboard" className="navbar-link">Leaderboard</Link> {/* Add Leaderboard link */}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default App;
