const mongoose = require('mongoose');

// Define the Leaderboard schema
const leaderboardSchema = new mongoose.Schema({
  playerName: { type: String, required: true },  // Store the player's name
  score: { type: Number, required: true },  // Store the player's score
}, { timestamps: true });  // Automatically adds createdAt and updatedAt fields

// Create the Leaderboard model based on the schema
const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

// Function to save a new leaderboard entry to the database
const addLeaderboardEntry = async (playerName, score) => {
  try {
    const newEntry = new Leaderboard({ playerName, score });
    await newEntry.save();
    console.log('Leaderboard entry saved successfully');
  } catch (error) {
    console.error('Error saving leaderboard entry:', error.message);
  }
};

// Function to get the top leaderboard entries
const getTopLeaderboardEntries = async (limit = 10) => {
  try {
    const topEntries = await Leaderboard.find()
      .sort({ score: -1 })  // Sort by score in descending order
      .limit(limit);  // Limit the number of entries (default 10)
    return topEntries;
  } catch (error) {
    console.error('Error fetching leaderboard entries:', error.message);
    return [];
  }
};

module.exports = { Leaderboard, addLeaderboardEntry, getTopLeaderboardEntries };
