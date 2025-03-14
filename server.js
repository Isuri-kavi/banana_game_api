// Import dependencies
const express = require("express");
const dotenv = require("dotenv"); // Load environment variables
const cors = require("cors"); // Handle cross-origin requests
const cookieParser = require("cookie-parser"); // Handle cookies
const mongoose = require("mongoose"); // MongoDB connection
const axios = require("axios"); // Make requests to the Banana API

// Import routes
const todoRoutes = require("./routes/todoRoutes");
const authRoutes = require("./routes/authRoutes");
const gameRoutes = require("./routes/gameRoutes");
const leaderboardRoutes = require("./routes/leaderboard"); // Correct route name

// Initialize dotenv for environment variables
dotenv.config();

// Debugging logs (optional)
console.log("Current working directory:", process.cwd());
console.log("Mongo URI:", process.env.MONGO_URI);

// Check if necessary environment variables are set
if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.error("MONGO_URI or JWT_SECRET is not defined in the .env file!");
  process.exit(1); // Exit the process if necessary environment variables are missing
}

// Initialize Express application
const app = express();

// Middleware setup
app.use(cors()); // Enable cross-origin requests
app.use(express.json()); // Parse incoming JSON requests
app.use(cookieParser()); // Parse cookies

// Serve static files from the "frontend" directory (if applicable)
app.use(express.static("frontend"));

// MongoDB connection setup
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit process on connection failure
  }
};

// Call the connectDB function to initiate the MongoDB connection
connectDB();

// Basic route to check server status
app.get("/", (req, res) => {
  res.send("Hello, Game App!"); // Simple response to confirm server is running
});

// Use routes for different endpoints
app.use("/api/todos", todoRoutes); // To-do route
app.use("/api/auth", authRoutes); // Authentication route
app.use("/api/game", gameRoutes); // Game route
app.use("/api/leaderboard", leaderboardRoutes); // Leaderboard route

// Function to get data from the Banana API
const getBananaData = async () => {
  try {
    const response = await axios.get("https://marcconrad.com/uob/banana/api.php");
    return response.data; // Return the data received from the API
  } catch (error) {
    console.error("Error connecting to Banana API:", error);
    return null; // Return null if the API call fails
  }
};

// Route to test the Banana API integration
app.get("/test-banana", async (req, res) => {
  const data = await getBananaData();
  if (data) {
    res.json(data); // Send the Banana API data as a JSON response
  } else {
    res.status(500).send("Failed to retrieve data from the Banana API");
  }
});

// Handle undefined routes (404 errors)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" }); // Handle 404 errors
});

// Global error handling middleware for uncaught errors
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message); // Log the error
  res.status(500).json({ message: "Internal server error" }); // Respond with a 500 error
});

// Start the server on the port specified in the .env file or fallback to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log when the server starts
});
