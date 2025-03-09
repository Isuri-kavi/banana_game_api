import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use the new `useNavigate` hook for redirection

  // Handle form data change
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission for registration
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (userData.password !== userData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!userData.username || !userData.password) {
      setError("Please fill out all fields.");
      return;
    }

    // Send POST request to backend to register the user
    axios
      .post("http://localhost:5000/api/auth/register", {
        username: userData.username,
        password: userData.password,
      })
      .then((response) => {
        // On successful registration, redirect to login page
        alert("Registration successful! You can now log in.");
        navigate("/login"); // Redirect to login page after successful registration
      })
      .catch((error) => {
        // Handle errors during registration
        setError(error.response ? error.response.data.message : "Registration failed");
      });
  };

  return (
    <div className="auth-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
};

export default Register;
