const mongoose = require("mongoose");

const User = mongoose.model("Favorites", {
  gameId: Number,
  game_name: String,
  game_image: String,
});

module.exports = User;
