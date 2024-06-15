// Import required modules
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');
const path = require('path');

// Connect to MongoDB
connectToMongo();

// Initialize the Express application
const app = express();
const port =process.env.PORT||5000;

// Use CORS middleware
app.use(
  cors({
      origin:process.env.FRONTEND_URL,
  })
)

// Middleware to parse JSON bodies
app.use(express.json());

// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.use(express.static(path.join(__dirname, './../client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './../client/build/index.html'));
});
// Start the server
app.listen(port, () => {
  console.log(`iNoteBook server is running on PORT: ${port}`);
});
