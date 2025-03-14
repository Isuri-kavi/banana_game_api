import React, { useState } from "react";
import axios from "axios";
import "./style.css"; // Add CSS file if necessary

const Game = () => {
  const [gameData, setGameData] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const clickSound = new Audio("/sounds/click.mp3"); // Path from the public folder
  const correctSound = new Audio("/sounds/correct.mp3"); // Correct answer sound
  const wrongSound = new Audio("/sounds/wrong.mp3"); // Wrong answer sound

  // Start game function
  const startGame = async () => {
    setLoading(true);
    setMessage("");
    clickSound.play(); // Play click sound when starting the game

    try {
      const response = await axios.get("http://localhost:5000/api/game/start");
      const data = response.data;

      if (data && data.data) {
        setGameData(data.data); // Set the game data after fetching from API
      } else {
        setMessage("No game data received.");
      }
    } catch (error) {
      console.error("Error fetching game data:", error);
      setMessage("Error starting the game.");
    } finally {
      setLoading(false);
    }
  };

  // Handle the answer submission
  const handleAnswerSubmit = () => {
    if (userAnswer.trim() === "") {
      setMessage("Please enter an answer.");
      return;
    }

    if (parseInt(userAnswer) === gameData.solution) {
      setMessage("Correct Answer!");
      correctSound.play(); // Play the correct answer sound
    } else {
      setMessage("Wrong Answer! Try Again.");
      wrongSound.play(); // Play the wrong answer sound
    }
  };

  return (
    <div className="game-container">
      <button onClick={startGame} disabled={loading} className="start-button">
        {loading ? "Loading..." : "Start Game"}
      </button>

      {/* Display game data if available */}
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
              onChange={(e) => setUserAnswer(e.target.value)} // Update the user answer
            />
            <button onClick={handleAnswerSubmit}>Submit Answer</button>
          </div>
        </div>
      )}

      {/* Display message for correctness */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Game;
