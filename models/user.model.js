const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,

    minlength: [3, "username must be at least 3 characters"],
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    minlength: [10, "Email must be at least 3 characters"],
  },
  password: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: [6, "password must be at least 3 characters"],
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
