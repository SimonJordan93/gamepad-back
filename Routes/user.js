// Import required dependencies
const express = require("express");
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const router = express.Router();

// Import the User model
const User = require("../models/User");

//  Import Authentication middleware
const isAuthenticated = require("../middlewares/isAuthenticated");
const { find } = require("../models/Wishlist");

// Route for signing up a new user
router.post("/signup", async (req, res) => {
  try {
    // Extract the user input from the request body
    const { email, username, password, confirmPassword } = req.body;

    // Check if any required fields are missing
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "Missing parameter" });
    }

    // Check if the two password inputs match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match !" });
    }

    // Check if the email is already used by another user
    const emailAlreadyUsed = await User.findOne({ email });

    if (emailAlreadyUsed) {
      return res.status(409).json({ message: "This email is already used" });
    }

    // Generate a new token, salt, and hash for the new user
    const token = uid2(64);
    const salt = uid2(16);
    const hash = SHA256(salt + password).toString(encBase64);

    // Create a new user object with the provided data
    const newUser = new User({
      email: email,
      account: {
        username: username,
      },
      token: token,
      hash: hash,
      salt: salt,
    });

    // Save the new user object to the database
    await newUser.save();

    // Send the relevant user data as a response
    const response = {
      _id: newUser._id,
      account: newUser.account,
      token: newUser.token,
    };
    res.json(response);
  } catch (error) {
    // Handle errors and send the error message as a JSON response
    res.status(400).json({ message: error.message });
  }
});

// Route for signing in an existing user
router.post("/signin", async (req, res) => {
  try {
    // Extract the email and password from the request body
    const { email, password } = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Calculate the hash of the provided password and compare it to the stored hash
    const newHash = SHA256(user.salt + password).toString(encBase64);

    if (newHash !== user.hash) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Send the relevant user data as a JSON response
    res.json({
      _id: user._id,
      account: user.account,
      token: user.token,
    });
  } catch (error) {
    // Handle errors and send the error message as a JSON response
    res.status(400).json({ message: error.message });
  }
});

// Route to Get UsersCollection from DB
router.get("/userCollection", isAuthenticated, async (req, res) => {
  try {
    const userId = req.user._id;

    const users = await User.findOne().populate(
      "collectionItem",
      "usersCollection"
    );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to Get UsersFavourites from DB
router.get("/userFavourites", isAuthenticated, async (req, res) => {
  try {
    const users = await User.find().populate(
      "favouritesItem",
      "usersFavourites"
    );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route for deleting a user
// Authentication of user is necessary (via token)
router.delete("/delete", isAuthenticated, async (req, res) => {
  try {
    // Extract the user id from the request body
    const userId = req.body._id;

    if (userId) {
      // Delete the user from the database
      await User.findByIdAndDelete(userId);

      // Send a success message as a JSON response
      res.json({ message: "User removed" });
    } else {
      // Send an error message if the user id is missing
      res.status(400).json({ message: "Missing id" });
    }
  } catch (error) {
    // Handle errors and send the error message as a JSON response
    res.status(400).json({ error: error.message });
  }
});

// Export the router object so it can be used in other parts of the application
module.exports = router;
