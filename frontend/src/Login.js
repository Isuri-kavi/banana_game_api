import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    // Send POST request to backend to authenticate user
    axios
      .post("http://localhost:5000/api/auth/login", { username, password })
      .then((response) => {
        // On successful login, store token (if using JWT) and redirect to home/dashboard
        localStorage.setItem("token", response.data.token); // Store the token (or other user data)
        setError(""); // Clear any previous errors
        navigate("/home"); // Redirect to home or dashboard
      })
      .catch((error) => {
        // Handle error (e.g., wrong credentials)
        setError(error.response ? error.response.data.message : "Login failed");
      });
  };

  const goToSignUp = () => {
    // Redirect user to Sign Up page if they don't have an account
    navigate("/signup");
  };

  return (
    <div className="login-container">
      <h2>Welcome Back</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>} {/* Display error message if any */}
        <button type="submit">Login</button>
      </form>
      <div className="signup-prompt">
        <p>Don't have an account?</p>
        <button onClick={goToSignUp}>Sign Up</button>
      </div>
    </div>
  );
};

export default Login;
