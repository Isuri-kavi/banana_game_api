// src/pages/LoginPage.js

import React from "react";
// In src/pages/LoginPage.js
import Login from "./Login";  // Correct path, since both files are in the same directory


const LoginPage = () => {
  return (
    <div className="login-page-container">
      <Login />
    </div>
  );
};

export default LoginPage;
