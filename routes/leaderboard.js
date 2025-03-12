const express = require('express');
const router = express.Router();
const Leaderboard = require('../models/Leaderboard');

// POST route to save the player's score
router.post('/add', async (req, res) => {
  const { playerName, score } = req.body;

  if (!playerName || !score) {
    return res.status(400).json({ message: 'Player name and score are required' });
  }

  try {
    // Save the new score to the database
    const newScore = new Leaderboard({
      playerName,
      score
    });

    await newScore.save();

    // Retrieve the top 10 leaderboard scores sorted by score in descending order
    const leaderboard = await Leaderboard.find().sort({ score: -1 }).limit(10);

    res.status(201).json({
      message: 'Score added successfully',
      data: newScore,
      leaderboard: leaderboard // Send back the updated leaderboard
    });
  } catch (error) {
    console.error('Error saving score:', error);
    res.status(500).json({ message: 'Error saving score' });
  }
});

module.exports = router;
