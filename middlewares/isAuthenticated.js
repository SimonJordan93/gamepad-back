// Import necessary packages and modules
const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("express-jwt");
const User = require("../models/User");

// Custom middleware function to check if user is authenticated
const isAuthenticated = async (req, res, next) => {
  try {
    // Extract token from authorization header
    const token = getTokenFromAuthorizationHeader(req.headers.authorization);
    // Verify token and extract user ID from it
    const decodedToken = verifyToken(token);
    // Find user with matching ID
    const user = await User.findById(decodedToken.sub).select("account");
    // If user is not found, throw an UnauthorizedError exception
    if (!user) {
      throw new UnauthorizedError("User not found");
    }
    // Set the user property of the request to the authenticated user
    req.user = user;
    // Call the next middleware function
    next();
  } catch (error) {
    // If an error occurs, return a JSON API error object with appropriate status code and error message
    const message = error.message || "Authentication error";
    const statusCode = error.status || 401;
    res.status(statusCode).json({ message });
  }
};

// Helper function to extract token from authorization header
const getTokenFromAuthorizationHeader = (header) => {
  // Check if authorization header is present
  if (!header) {
    throw new UnauthorizedError("Authorization header not found");
  }
  // Split authorization header into scheme and token
  const [scheme, token] = header.split(" ");
  // Check if authorization scheme is Bearer
  if (scheme !== "Bearer") {
    throw new UnauthorizedError("Invalid authorization scheme");
  }
  // Check if token is present
  if (!token) {
    throw new UnauthorizedError("Token not found");
  }
  // Return the token
  return token;
};

// Helper function to verify token and extract user ID from it
const verifyToken = (token) => {
  try {
    // Verify token using JWT package and extract user ID from it
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken;
  } catch (error) {
    // If token is invalid, throw an UnauthorizedError exception
    throw new UnauthorizedError("Invalid token");
  }
};

// Export the isAuthenticated middleware for use in other parts of code
module.exports = isAuthenticated;
