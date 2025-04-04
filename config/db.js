// db.js
const mongoose = require("mongoose");
require('dotenv').config();
const connectDB = async () => {
  try {
    // Replace <username>, <password>, and <cluster> with your own values
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cd15p.mongodb.net/DriveClone?retryWrites=true&w=majority&appName=Cluster0`;

    await mongoose.connect(uri);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
