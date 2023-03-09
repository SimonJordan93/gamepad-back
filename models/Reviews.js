const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  gameId: { type: Number, required: true },
  title: { type: String, required: true },
  comment: { type: String, required: true },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  usersReviewed: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  usersVoted: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Review = mongoose.model("Reviews", ReviewSchema);

module.exports = Review;
