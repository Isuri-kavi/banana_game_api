import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';  // Import the CSS file for the Navbar styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="navbar-logo-text">Game</Link>
        </div>
        <ul className="navbar-links">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
