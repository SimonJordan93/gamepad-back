// Import Express library
const express = require("express");
// Create new Express router
const router = express.Router();
// Import custom middleware to check if user is authenticated
const isAuthenticated = require("../middlewares/isAuthenticated");
// Import Review model
const Review = require("../models/Reviews");
// Import Votes model
const Vote = require("../models/Votes");

// Create a new review
router.post("/review/create", isAuthenticated, async (req, res) => {
  try {
    const { title, comment, gameId } = req.body;
    const userId = req.user._id;

    // Check if user has already reviewed the game
    const existingReview = await Review.findOne({
      gameId,
      userReview: userId,
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
      userReview: userId,
    });

    // Save new review to database
    await newReview.save();
    res.json(newReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Find all reviews for a given game ID
router.get("/review/:gameId", async (req, res) => {
  try {
    const gameReviews = await Review.find({ gameId: req.params.gameId });
    res.json(gameReviews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Find all reviews for a given user ID
router.get("/review/:userId", async (req, res) => {
  try {
    const userReviews = await Review.find({ userReview: req.params.userId });
    res.json(userReviews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Vote for a review
router.post("/review/vote/:reviewId", isAuthenticated, async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const userId = req.user._id;
    const voteType = req.body.voteType; // "upvote" or "downvote"

    // Find the review
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Check if the user has already voted
    const existingVote = await Vote.findOne({ user: userId, review: reviewId });

    if (existingVote) {
      if (voteType === "upvote" && existingVote.upvote) {
        // User clicked the same vote type again, remove the vote
        review.upvotes -= 1;
        existingVote.upvote = false;
      } else if (voteType === "downvote" && existingVote.downvote) {
        // User clicked the same vote type again, remove the vote
        review.downvotes -= 1;
        existingVote.downvote = false;
      }
      // User clicked the opposite vote type, update the vote
      else if (voteType === "upvote" && existingVote.downvote) {
        review.upvotes += 1;
        review.downvotes -= 1;
        existingVote.upvote = true;
        existingVote.downvote = false;
      } else if (voteType === "downvote" && existingVote.upvote) {
        review.upvotes -= 1;
        review.downvotes += 1;
        existingVote.upvote = false;
        existingVote.downvote = true;
      } else if (voteType === "upvote") {
        review.upvotes += 1;
        existingVote.upvote = true;
      } else if (voteType === "downvote") {
        review.downvotes += 1;
        existingVote.downvote = true;
      }

      await existingVote.save();
    } else {
      // User has not voted before, create a new vote
      const newVote = new Vote({ user: userId, review: reviewId });
      if (voteType === "upvote") {
        review.upvotes += 1;
        newVote.upvote = true;
      } else {
        review.downvotes += 1;
        newVote.downvote = true;
      }
      await newVote.save();
    }

    // Save the updated review
    await review.save();
    res.json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Update a Review
router.put("/review/:reviewId", isAuthenticated, async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const userId = req.user._id;

    // Find the review
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Check if the user is the author of the review
    if (review.userReview.toString() !== userId.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Update the review
    review.title = req.body.title;
    review.comment = req.body.comment;
    await review.save();
    res.json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a review
router.delete("/review/:reviewId", isAuthenticated, async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const userId = req.user._id;

    // Find the review
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Check if the user is the author of the review
    if (review.userReview.toString() !== userId.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Delete the review
    await Review.findByIdAndDelete(reviewId);
    res.json({ message: "Review deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Export the router containing the review routes
module.exports = router;
