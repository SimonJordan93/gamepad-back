const express = require("express");
const router = express.Router();
const User = require("../models/User");
const isAuthenticated = require("../middlewares/isAuthenticated");

// Route to add a game to user's favorites
router.post("/favorites/add", isAuthenticated, async (req, res) => {
  const { gameId, game_name, game_image } = req.body;
  try {
    const userFavs = await User.findById(req.user._id);
    const favoriteGames = userFavs.account.favorites;

    for (let i = 0; i < favoriteGames.length; i++) {
      if (gameId == favoriteGames[i].gameId) {
        return res.status(400).json({ message: "Game has already been added" });
      }
    }
    const user = await User.findByIdAndUpdate(
      req.user._id,


    res.json(user.account);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Route to delete a game from user's favorites
router.delete("/favorites/delete/:gameId", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(
      req.user._id,


    res.json(user.account);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
