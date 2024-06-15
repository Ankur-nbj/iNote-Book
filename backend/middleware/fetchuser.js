require('dotenv').config();
const jwt = require("jsonwebtoken"); 

const JWT_SECRET = process.env.SECRET; // Use environment variable for JWT secret key

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).send({ error: "Please authenticate with valid token" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate with valid token" });
  }
};

module.exports = fetchuser;
