const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register user
exports.registerUser = async (req, res) => {
  try {
    console.log("Received request body:", req.body);

    const { username, email, password } = req.body;

    // Validate input fields
    if (!username || !email || !password) {
      console.log("Validation failed: Missing fields");
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists:", email);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    // Save user to the database
    await newUser.save();
    console.log("User successfully created:", newUser);
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error("Error occurred while registering user:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    console.log("Received login request body:", req.body);

    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
      console.log("Validation failed: Missing fields");
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found:", email);
      return res.status(400).json({ message: 'User does not exist' });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid credentials for user:", email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    console.log("User logged in successfully:", email);
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error("Error occurred during login:", err);
    res.status(500).json({ message: 'Server error' });
  }
};
