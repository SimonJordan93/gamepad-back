const express = require("express");
const router = express.Router();
const axios = require("axios");

// Games Route
router.get("/games", async (req, res) => {
  try {
    const search = req.query.search || "";
    const page = req.query.page || 1;
    let platforms = req.query.platforms;
    let genres = req.query.genres;
    let stores = req.query.stores;
    let ordering = req.query.ordering;

    let url = `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&page=${page}&search_precise=true&search=${search}`;

    if (platforms) {
      url += `&platforms=${platforms}`;
    }
    if (genres) {
      url += `&genres=${genres}`;
    }
    if (stores) {
      url += `&stores=${stores}`;
    }
    if (ordering) {
      url += `&ordering=${ordering}`;
    }

    const response = await axios.get(url);
    res.json(response.data);
    // console.log("oui");
  } catch (error) {
    res.status(400).json({ message: error.message });
    // console.log("non");
  }
});

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

// Platforms Route (by Id)
router.get("/platforms", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/platforms?key=${process.env.RAWG_API_KEY}`
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

// Genres Route (by Id)
router.get("/genres", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/genres?key=${process.env.RAWG_API_KEY}`
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

// Stores Route (by Id)
router.get("/stores", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/stores?key=${process.env.RAWG_API_KEY}`
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
