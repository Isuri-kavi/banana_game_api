// src/pages/GamePage.js

import React from "react";
import { useNavigate } from "react-router-dom";

const GamePage = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate("/game"); // This will redirect to the game page
  };

  return (
    <div>
      <h2>Welcome to the Game!</h2>
      <button onClick={handleStartGame}>Start Game</button>
    </div>
  );
};

export default GamePage;
