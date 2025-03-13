import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/login"); // Redirects to the login page
  };

  return (
    <div className="home-container">
      <h1>Welcome to Banana World</h1>
      <button className="play-btn" onClick={handleStart}>
        Start
      </button>
    </div>
  );
}

export default Home;
