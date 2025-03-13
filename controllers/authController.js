const bcrypt = require('bcryptjs'); // Ensure consistent use of 'bcrypt'
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import the User model
require('dotenv').config(); // Load environment variables

// Register user
const registerUser = async (req, res) => {
  let { username, password } = req.body;

  // Trim whitespace and standardize input
  username = username.trim().toLowerCase();
  password = password.trim();

  console.log('Request body (register):', { username, password: '[HIDDEN]' });

  if (!username || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password securely
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    console.log(`User registered: ${username}`);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// Login user
const loginUser = async (req, res) => {
  let { username, password } = req.body;

  // Trim whitespace and standardize input
  username = username.trim().toLowerCase();
  password = password.trim();

  console.log('Request body (login):', { username, password: '[HIDDEN]' });

  if (!username || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials - User not found" });
    }

    console.log('Stored Hashed Password:', user.password);

    // Compare entered password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match result:', isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials - Password mismatch" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log(`User logged in: ${username}`);

    res.status(200).json({
      message: "Login successful",
      token,
      user: { username: user.username, id: user._id }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: "Server error during login" });
  }
};

module.exports = { registerUser, loginUser };
