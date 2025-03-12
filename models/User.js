const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Import bcryptjs to hash passwords

// Define schema for User
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensures that username is unique
  },
  password: {
    type: String,
    required: true, // Ensures that password is required
  },
});

// Hash the password before saving it to the database
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); // Only hash the password if it has been modified

  const salt = await bcrypt.genSalt(10);  // Generate salt for bcrypt
  this.password = await bcrypt.hash(this.password, salt);  // Hash the password
  next();  // Continue with the save operation
});

// Method to check if entered password matches the hashed password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);  // Compare hashed password with entered password
};

// Create User model from schema
const User = mongoose.model('User', userSchema);

module.exports = User;
