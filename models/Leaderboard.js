const mongoose = require('mongoose');

// Define the Leaderboard schema
const leaderboardSchema = new mongoose.Schema({
  playerName: { 
    type: String, 
    required: true, 
    unique: true,  // Ensure player names are unique
  }, 
  score: { 
    type: Number, 
    required: true, 
    min: 0  // Ensure scores are non-negative
  },
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
const getTopLeaderboardEntries = async (limit = 5) => {
  try {
    const topEntries = await Leaderboard.find()
      .sort({ score: -1 })  // Sort by score in descending order
      .limit(limit);  // Limit the number of entries (default 5)
    return topEntries;
  } catch (error) {
    console.error('Error fetching leaderboard entries:', error.message);
    return [];
  }
};

// Sample data insertion (use this when testing)
const addSampleData = async () => {
  try {
    await addLeaderboardEntry('Player1', 100);
    await addLeaderboardEntry('Player2', 200);
    await addLeaderboardEntry('Player3', 150);
    await addLeaderboardEntry('Player4', 250);
    await addLeaderboardEntry('Player5', 180);
  } catch (error) {
    console.error('Error adding sample data:', error.message);
  }
};

// Uncomment the following line to insert sample data into the DB
// addSampleData();

module.exports = { Leaderboard, addLeaderboardEntry, getTopLeaderboardEntries };
