const express = require("express");
const router = express.Router();
const User = require("../models/User");
const isAuthenticated = require("../middlewares/isAuthenticated");

// Route to add a game to user's favorites
router.post("/favorites/add", isAuthenticated, async (req, res) => {
  const { gameId, game_name, game_image } = req.body;
});

// Route to delete a game from user's favorites
router.delete("/favorites/delete/:gameId", async (req, res) => {});

module.exports = router;
