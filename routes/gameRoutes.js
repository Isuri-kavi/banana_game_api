// Import necessary modules
const express = require('express');
const router = express.Router();

// Define timer durations (in seconds)
const timers = {
  easy: 60,
  medium: 45,
  hard: 30,
};

// Route to start the game
router.post('/start-game', (req, res) => {
  const { difficulty } = req.body;  // Get difficulty from the request body

  // Check if the difficulty is valid
  if (!timers[difficulty]) {
    return res.status(400).json({ error: 'Invalid difficulty level' });
  }

  // Set the timer for the game based on difficulty
  const timeLimit = timers[difficulty];

  // You can add game state initialization logic here (e.g., questions, score)

  // Send a response with the game details
  res.json({
    message: `Game started with ${difficulty} difficulty!`,
    timeLimit,
  });
});

module.exports = router;
