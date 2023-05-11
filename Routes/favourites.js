// Import required dependencies
const express = require("express");
const router = express.Router();

// Import User and FavouritesItem models
const User = require("../models/User");
const FavouritesItem = require("../models/FavouritesItem");

// Import Authentication middleware
const isAuthenticated = require("../middlewares/isAuthenticated");

// Add a favourite item to a user's list
router.post("/favourites/add/:gameId", isAuthenticated, async (req, res) => {
  try {
    const { gameTitle, gameImg } = req.body;
    const gameId = req.params.gameId;
    const userId = req.user._id;

    // Check if the game is already in the user's favourites
    const existingItem = await FavouritesItem.findOne({
      gameId,
      userFavourites: userId,
    });
    if (existingItem) {
      return res
        .status(400)
        .send({ message: "Game already exists in your favourites" });
    }

    const item = new FavouritesItem({
      gameId,
      gameTitle,
      gameImg,
      userFavourites: userId,
    });
    await item.save();

    await User.findByIdAndUpdate(userId, {
      $push: { favouritesItem: item._id },
    });

    res.status(201).send(item);
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
});

// Remove a favourite item from a user's list
router.delete(
  "/favourites/remove/:gameId",
  isAuthenticated,
  async (req, res) => {
    try {
      const gameId = req.params.gameId;
      const userId = req.user._id;

      const item = await FavouritesItem.findOneAndDelete({
        gameId,
        userFavourites: userId,
      });

      if (!item)
        return res.status(404).send({ message: "Favourite item not found" });

      await User.findByIdAndUpdate(userId, {
        $pull: { favouritesItem: item._id },
      });

      res.send({ message: "Favourite item removed" });
    } catch (error) {
      res.status(500).send({ message: "Server error" });
    }
  }
);

// Get a list of all favourite items for a user
router.get("/favourites/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId.trim();

    // Find user
    const user = await User.findById(userId).populate("favouritesItem");
    if (!user) return res.status(404).send({ message: "User not found" });

    res.send(user.favouritesItem);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Check if a game exists in a user's FavouritesItem
router.get("/favourites/exists/:userId/:gameId", async (req, res) => {
  try {
    const { userId, gameId } = req.params;

    // Find user and check if the game exists in the user's favourites
    const user = await User.findById(userId);
    if (!user) return res.status(404).send({ message: "User not found" });

    const exists = await FavouritesItem.exists({
      gameId,
      userFavourites: userId,
    });

    res.send(exists ? true : false);
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
});

module.exports = router;
