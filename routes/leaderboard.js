const express = require('express');
const router = express.Router();
const { getTopLeaderboardEntries } = require('../models/Leaderboard'); // Import functions

// Route to get top 5 scores
router.get("/top5", async (req, res) => {
  try {
    const topScores = await getTopLeaderboardEntries(5); // Get top 5 leaderboard entries
    res.json(topScores);  // Send the top scores as JSON response
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Server error while fetching leaderboard." });
  }
});

module.exports = router;
