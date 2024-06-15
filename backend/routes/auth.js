require('dotenv').config();
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

// Secret key for JWT
const JWT_SECRET = process.env.SECRET;

// ROUTE: Route to create a new user using POST "api/auth/createuser", NO LOGIN REQUIRED
router.post(
  "/createuser",
  [
    // Validation rules
    body("name", "Enter a Valid Name").isLength({ min: 5 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // Validate request based on rules defined above
    console.log(req.body)
    const errors = validationResult(req);
    let success=false;
    if (!errors.isEmpty()) {
      
      return res.status(400).json({ success: false,errors: errors.array() });
    }

    try {
      // Check if the user already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success: false, error: "A user with this email already exists" });
      }

      // Generate salt for password hashing
      const salt = await bcrypt.genSalt(10);
      // Hash the password
      const seqpass = await bcrypt.hash(req.body.password, salt);

      // Create and save the new user with hashed password
      const newUser = new User({
        name: req.body.name,
        password: seqpass,
        email: req.body.email,
      });
      
      const savedUser =await newUser.save();
     
      // Sign the JWT token
      const authtoken = jwt.sign({id :savedUser._id}, JWT_SECRET);

      // Respond with the authentication token
      
      res.json({ success: true,authtoken: authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// ROUTE 2: Route to AUTHENTICATE a user using POST "api/auth/login", NO LOGIN REQUIRED
router.post(
  "/login",
  [
    // Validation rules
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be empty").exists(),
  ],
  async (req, res) => {
    // Validate request based on rules defined above
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring email and password from request body
    const { email, password } = req.body;
    try {
      // Check if the user exists
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid Credentials" });
      }

      // Compare the password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid Credentials" });
      }

      // Create a JWT payload
      const payload = {
        user: {
          id: user.id,
          name: user.name // Include name in the payload
        },
      };

      // Sign the JWT token
      const token = jwt.sign(payload, JWT_SECRET);

      // Respond with the authentication token, userId, and name
      res.json({ success: true, token, userId: user.id, name: user.name });

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);


//ROUTE: Get logined user details using POST "api/auth/getuser" - LOGIN REQUIRED
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
