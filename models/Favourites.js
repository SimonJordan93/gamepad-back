const mongoose = require("mongoose");

const FavouritesItemSchema = new mongoose.Schema({
  // ID of the game being added to Collection (required)
  gameId: { type: Number, required: true },

  gameTitle: String,

  gameImg: String,
  // Reference to the Users who added the item to their Favourites
  usersFavourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const FavouritesItem = mongoose.model("FavouritesItem", FavouritesItemSchema);

module.exports = FavouritesItem;
