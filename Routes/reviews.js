const express = require("express");

const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");

// Import du modèle User
const Review = require("../models/Reviews");

// Make a Review
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

    const newReview = new Review({
      gameId: gameId,
      title: title,
      comment: comment,
      usersReviewed: [userId],
    });
    await newReview.save();
    res.json(newReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Find all Reviews for a game
router.get("/reviews/game/:gameId", async (req, res) => {
  try {
    const gameReviews = await Review.find({ gameId: req.params.gameId });
    res.json(gameReviews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Upvote a review
router.put("/reviews/upvote/:id", isAuthenticated, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    const userId = req.user._id;

    // Check if user has already upvoted the review
    if (review.usersVoted.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already voted on this review" });
    }

    review.upvotes += 1;
    review.usersVoted.push(userId);
    await review.save();
    res.json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Downvote a review
router.put("/reviews/downvote/:id", isAuthenticated, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    const userId = req.user._id;

    // Check if user has already downvoted the review
    if (review.usersVoted.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already voted on this review" });
    }

    review.downvotes += 1;
    review.usersVoted.push(userId);
    await review.save();
    res.json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Export de router qui contient mes routes
module.exports = router;
