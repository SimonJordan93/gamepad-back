const express = require("express");
const router = express.Router();
const User = require("../models/User");
const isAuthenticated = require("../middlewares/isAuthenticated");

// Route to add a game to user's favorites
router.post("/favorites/add", isAuthenticated, async (req, res) => {
  const { gameId, game_name, game_image } = req.body;

  try {
    // Check if the game already exists in the user's favorites

    // if (existingFavorite) {
    //   return res.status(409).json({ message: "Game already in favorites" });
    // }

    // Create a new Favorites document and associate it with the current user
    const newFavorite = new Favorites({
      gameId: gameId,
      game_name: game_name,
      game_image: game_image,
    });

    // Save the new Favorites document to the database
    await newFavorite.save();

    // Return a success response
    res.json({ message: "Favorite added successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occurred while adding the favorite" });
  }
});

// Route to delete a game from user's favorites
router.delete("/favorites/delete/:gameId", async (req, res) => {
  const gameId = req.params.gameId;

  try {
    // Find the Favorites document with the specified gameId
    const favorite = await Favorites.findOne({ gameId: gameId });

    // If no matching document was found, return an error response
    if (!favorite) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    // Delete the Favorites document from the database
    await Favorites.findByIdAndDelete(favorite._id);

    // Return a success response
    res.json({ message: "Favorite deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the favorite" });
  }
});

module.exports = router;
