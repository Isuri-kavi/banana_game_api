// Import dependencies
const express = require('express');
const dotenv = require('dotenv');  // Import dotenv to load .env variables
const cors = require('cors');      // Import CORS to handle cross-origin requests
const bodyParser = require('body-parser');  // Import bodyParser for parsing request bodies
const cookieParser = require('cookie-parser');  // Import cookieParser for handling cookies
const mongoose = require('mongoose');  // Import mongoose for MongoDB connection
const axios = require('axios');  // Import axios to make requests to the Banana API

// Import routes for todos, authentication, and game
const todoRoutes = require('./routes/todoRoutes'); 
const authRoutes = require('./routes/authRoutes');
const gameRoutes = require('./routes/gameRoutes');  // Import game routes

// Initialize dotenv to load environment variables from the .env file
require('dotenv').config();
console.log('Current working directory:', process.cwd()); // Check the current working directory
console.log('Mongo URI:', process.env.MONGO_URI); // Log the Mongo URI to check if it’s loaded correctly

// Initialize Express application
const app = express();

// Middleware setup
app.use(cors());  // Allow cross-origin requests
app.use(bodyParser.json());  // Parse JSON request bodies
app.use(cookieParser());  // Parse cookies in requests

// MongoDB connection setup
const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI from the .env file without deprecated options
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);  // Exit process on failure to connect
  }
};

// Call the connectDB function to initiate the MongoDB connection
connectDB();

// Basic route to check server status
app.get('/', (req, res) => {
  res.send('Hello, Todo App!');  // Simple response to confirm server is running
});

// Use todoRoutes for all '/api/todos' routes
app.use('/api/todos', todoRoutes);

// Use authRoutes for all '/api/auth' routes
app.use('/api/auth', authRoutes);

// Use gameRoutes for all '/api/game' routes (new game route)
app.use('/api/game', gameRoutes);

// Function to get data from the Banana API
const getBananaData = async () => {
  try {
    const response = await axios.get('https://marcconrad.com/uob/banana/api.php'); // Previous Banana API endpoint
    return response.data;  // Return the data received from the API
  } catch (error) {
    console.error("Error connecting to Banana API:", error);
  }
};

// Route to test the Banana API integration
app.get('/test-banana', async (req, res) => {
  const data = await getBananaData();
  if (data) {
    res.json(data);  // Send the Banana API data back in the response
  } else {
    res.status(500).send("Failed to retrieve data from the Banana API");
  }
});

// Start the server on the port specified in the .env file or fallback to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
