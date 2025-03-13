import React, { useState } from "react";
import axios from "axios";
import "./style.css"; // Add CSS file if necessary

const Game = () => {
  const [gameData, setGameData] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const clickSound = new Audio("frontend/sounds/click.mp3");

  const startGame = async () => {
    setLoading(true);
    setMessage("");
    clickSound.play();

    try {
      const response = await axios.get("http://localhost:5001/api/game/start");
      const data = response.data;

      if (data && data.data) {
        setGameData(data.data);
      }
    } catch (error) {
      console.error("Error fetching game data:", error);
      setMessage("Error starting the game.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSubmit = () => {
    if (parseInt(userAnswer) === gameData.solution) {
      setMessage("Correct Answer!");
    } else {
      setMessage("Wrong Answer! Try Again.");
    }
  };

  return (
    <div className="game-container">
      <button onClick={startGame} disabled={loading} className="start-button">
        {loading ? "Loading..." : "Start Game"}
      </button>

      {gameData && (
        <div>
          <div id="question-container">
            <img src={gameData.question} alt="Question" />
          </div>

          <div id="answer-container">
            <input
              type="number"
              placeholder="Enter your answer"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />
            <button onClick={handleAnswerSubmit}>Submit Answer</button>
          </div>
        </div>
      )}

      {message && <p>{message}</p>}
    </div>
  );
};

export default Game;
