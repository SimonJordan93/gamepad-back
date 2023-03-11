// Import Express library
const express = require("express");
// Create new Express router
const router = express.Router();
// Import custom middleware to check if user is authenticated
const isAuthenticated = require("../middlewares/isAuthenticated");
// Import Review model
const Review = require("../models/Reviews");

// Create a new review
router.post("/review/create", isAuthenticated, async (req, res) => {
  try {
    const { title, comment, gameId } = req.body;
    const userId = req.user._id;

    // Check if user has already reviewed the game
    const existingReview = await Review.findOne({
      gameId,
      usersReviewed: userId,
    });
    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this game" });
    }

    // Create new Review object with given parameters
    const newReview = new Review({
      gameId: gameId,
      title: title,
      comment: comment,
      usersReviewed: [userId],
    });

    // Save new review to database
    await newReview.save();
    res.json(newReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Find all reviews for a given game ID
router.get("/reviews/game/:gameId", async (req, res) => {
  try {
    const gameReviews = await Review.find({ gameId: req.params.gameId });
    res.json(gameReviews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Upvote a review
router.put("/reviews/upvote/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    const userId = req.user._id;

    // Check if user has already upvoted the review
    if (review.usersVoted.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already voted on this review" });
    }

    // Increment upvotes and add user to usersVoted array
    review.upvotes += 1;
    review.usersVoted.push(userId);

    // Save updated review to database
    await review.save();
    res.json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Downvote a review
router.put("/reviews/downvote/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    const userId = req.user._id;

    // Check if user has already downvoted the review
    if (review.usersVoted.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already voted on this review" });
    }

    // Increment downvotes and add user to usersVoted array
    review.downvotes += 1;
    review.usersVoted.push(userId);

    // Save updated review to database
    await review.save();
    res.json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Export the router containing the review routes
module.exports = router;
