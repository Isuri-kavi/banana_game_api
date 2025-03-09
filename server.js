// Import dependencies
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const todoRoutes = require('./routes/todoRoutes'); // Import todo routes

// Initialize dotenv
dotenv.config();

// Initialize Express
const app = express();

// Middleware setup
app.use(cors());  // Handle cross-origin requests
app.use(bodyParser.json());  // Parse JSON request bodies
app.use(cookieParser());  // Parse cookies

// Basic route to check server status
app.get('/', (req, res) => {
    res.send('Hello, Todo App!');
});

// Use todoRoutes for all '/api/todos' routes
app.use('/api/todos', todoRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
