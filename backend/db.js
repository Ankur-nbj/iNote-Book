// Importing necessary modules
require('dotenv').config();
const mongoose = require("mongoose");

// MongoDB connection URI from environment variables
const DB = process.env.MONGO_URL;

// Function to connect to MongoDB
const connectToMongo = async () => {
  try {
    // Connecting to MongoDB using mongoose.connect()
    await mongoose.connect(DB, {
      useNewUrlParser: true,  // useNewUrlParser option is recommended to avoid deprecation warnings
      useUnifiedTopology: true  // useUnifiedTopology option is recommended to use the new connection management engine
    });
    // If the connection is successful, log a success message
    console.log("MongoDB connected successfully");
  } catch (err) {
    // If an error occurs during connection, log the error
    console.error("MongoDB connection error:", err);
    // Optionally, you might want to rethrow the error or exit the process
    // throw err;
    // process.exit(1);
  }
};

// Exporting the connectToMongo function to be used in other files
module.exports = connectToMongo;
