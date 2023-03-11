// Import Mongoose library
const mongoose = require("mongoose");

// Define Mongoose Model for a review
const Review = new mongoose.model("Review", {
  // ID of the game being reviewed (required)
  gameId: { type: Number, required: true },
  // Title of the review (required)
  title: { type: String, required: true },
  // Content of the review (required)
  comment: { type: String, required: true },
  // Number of upvotes the review has received (defaults to 0)
  upvotes: { type: Number, default: 0 },
  // Number of downvotes the review has received (defaults to 0)
  downvotes: { type: Number, default: 0 },
  // User who created the review (reference to "User" collection)
  userReview: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  // Array of users who have voted on the review (references to "User" collection)
  usersVoted: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

// Export model for use in other parts of code
module.exports = Review;
