// Import required dependencies
const express = require('express');
const router = express.Router();
const axios = require('axios'); // Import axios for making HTTP requests

// Sample leaderboard data (replace this with MongoDB data or your own logic)
let leaderboard = [
  { playerName: 'isuri', score: 100 },
  { playerName: 'iii', score: 100 }
];

// Route to start the game
router.get('/start', async (req, res) => {
  try {
    // Fetch data from the game API
    const response = await axios.get('https://marcconrad.com/uob/banana/api.php');
    const { question, solution } = response.data;

    // Send the question and solution to the frontend
    res.status(200).json({
      data: {
        question,
        solution,
      },
    });
  } catch (error) {
    console.error('Error fetching game data:', error);
    res.status(500).json({ message: "Failed to fetch game data" });
  }
});

// Route to submit an answer
router.post('/submit', (req, res) => {
  const { answer, playerName } = req.body;

  // Example logic to handle the answer
  if (!answer || !playerName) {
    return res.status(400).json({ message: "Answer and playerName are required" });
  }

  // Example: Add the player's score to the leaderboard
  const score = Math.floor(Math.random() * 100); // Replace with actual scoring logic
  leaderboard.push({ playerName, score });

  // Send a success response
  res.status(200).json({
    message: `Answer submitted by ${playerName}: ${answer}`,
    score, // Include the score in the response
  });
});

// Route to get the leaderboard
router.get('/leaderboard', (req, res) => {
  // Sort the leaderboard in descending order by score
  leaderboard.sort((a, b) => b.score - a.score);

  // Send the leaderboard as a JSON response
  res.status(200).json({ leaderboard });
});

module.exports = router;