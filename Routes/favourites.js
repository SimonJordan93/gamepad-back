// Import required dependencies
const express = require("express");
const router = express.Router();
const axios = require("axios");

// Import User model
const User = require("../models/User");

// Import Authentication middleware
const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/user/favourites/add", isAuthenticated, async (req, res) => {
  try {
    // Extract the user id from the request body
  } catch (error) {
    // Handle errors and send the error message as a JSON response
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
