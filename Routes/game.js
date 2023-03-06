const express = require("express");
const router = express.Router();
const axios = require("axios");

// Game Details Route (by Id)
router.get("/game/:gameId", async (req, res) => {
  try {
    const { gameId } = req.params;

    const response = await axios.get(
      `https://api.rawg.io/api/games/${gameId}?key=${process.env.RAWG_API_KEY}`
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
