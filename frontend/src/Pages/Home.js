import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

   // Navigate to continue the existing game (implement logic to resume game)
   const continueGame = () => {
    navigate("/continue"); // Redirect to continue the game (you can handle logic here)
  };

  // Navigate to the game page for a new game
  const startNewGame = () => {
    navigate("/game"); // Redirect to the game page
  };


  // Navigate to the leaderboard page
  const showLeaderboard = () => {
    navigate("/leaderboard"); // Redirect to leaderboard page
  };

  return (
    <div className="home-container">
      <h1>Welcome to Banana World</h1>
      <div className="home-buttons">
        <button className="home-btn" onClick={startNewGame}>
          New Game
        </button>
        <button className="home-btn" onClick={continueGame}>
          Continue
        </button>
        <button className="home-btn" onClick={showLeaderboard}>
          Leaderboard
        </button>
      </div>
    </div>
  );
}

export default Home;
