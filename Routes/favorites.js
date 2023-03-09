const express = require("express");
const router = express.Router();
const User = require("../models/User");
const isAuthenticated = require("../middlewares/isAuthenticated");

// Route to add a game to user's favorites
router.post("/favorites/add", isAuthenticated, async (req, res) => {
  const { gameId, game_name, game_image } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: {
          "account.favorites": {
            gameId,
            game_name,
            game_image,
          },
        },
      },
      { new: true }
    );
    res.json(user.account);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Route to delete a game from user's favorites
router.delete(
  "/favorites/delete/:gameId",
  isAuthenticated,
  async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: {
            "account.favorites": {
              gameId: req.params.gameId,
            },
          },
        },
        { new: true }
      );

      res.json(user.account);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
