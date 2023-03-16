// Import User model
const User = require("../models/User");

// Custom middleware function to check if user is authenticated
const isAuthenticated = async (req, res, next) => {
  try {
    // Check if authorization header is present
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Extract token from authorization header
    const token = req.headers.authorization.replace("Bearer ", "");

    // Find user with matching token
    const user = await User.findOne({ token: token }).select("account");

    // If user is not found, return 401 Unauthorized
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Set the user property of the request to the authenticated user
    req.user = user;

    // Call the next middleware function
    next();
  } catch (error) {
    // If an error occurs, return a 400 Bad Request response with the error message
    res.status(400).json({ message: error.message });
  }
};

// Export the isAuthenticated middleware for use in other parts of code
module.exports = isAuthenticated;
