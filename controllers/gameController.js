const Leaderboard = require('../models/Leaderboard');  // Import the Leaderboard model

// Function to fetch leaderboard data
const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ score: -1 }).limit(10);  // Get top 10 scores, sorted by score
    res.status(200).json({ leaderboard });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { startGame, submitAnswer, getLeaderboard };  // Export the functions
