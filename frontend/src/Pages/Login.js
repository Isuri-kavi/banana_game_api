import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle form data change
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!userData.username || !userData.password) {
      setError("Please enter both username and password.");
      return;
    }

    // Send POST request to backend to authenticate user
    axios
      .post("http://localhost:5000/api/auth/login", {
        username: userData.username,
        password: userData.password,
      })
      .then((response) => {
        // On successful login, store token (if using JWT) and redirect to home
        localStorage.setItem("token", response.data.token); // Store the token (or other user data)
        setError(""); // Clear any previous errors
        navigate("/home"); // Redirect to the home page after successful login
      })
      .catch((error) => {
        // Handle error (e.g., wrong credentials)
        setError(error.response?.data?.message || "Login failed");
      });
  };

  const goToSignUp = () => {
    // Redirect user to Sign Up page if they don't have an account
    navigate("/register");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
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
