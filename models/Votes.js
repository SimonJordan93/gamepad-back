// Import the Mongoose library to help with MongoDB object modeling
const mongoose = require("mongoose");

const VoteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  review: { type: mongoose.Schema.Types.ObjectId, ref: "Review" },
  upvote: { type: Boolean, default: false },
  downvote: { type: Boolean, default: false },
});

const Vote = mongoose.model("Vote", VoteSchema);

module.exports = Vote;
