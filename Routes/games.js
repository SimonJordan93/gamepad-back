// Import required dependencies
const axios = require("axios");
const express = require("express");
const router = express.Router();

// Route to get games with optional query parameters
router.get("/games", async (req, res) => {
  try {
    // Extract query parameters from the request
    const search = req.query.search || "";
    const page = req.query.pageParam || 1;
    let platforms = req.query.platforms;
    let genres = req.query.genres;
    let stores = req.query.stores;
    let ordering = req.query.ordering;

    // Construct the URL for RAWG API with the given query parameters
    let url = `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&page=${pagParam}&search_precise=true&search=${search}`;

    // Add additional query parameters if they are present
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

    // Make an API call to fetch games and send the response data as JSON
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    // Handle errors and send the error message as JSON
    res.status(400).json({ message: error.message });
  }
});

// Route to get game details by game ID
router.get("/game/:gameId", async (req, res) => {
  try {
    // Extract gameId from request parameters
    const { gameId } = req.params;

    // Make an API call to fetch game details and send the response data as JSON
    const response = await axios.get(
      `https://api.rawg.io/api/games/${gameId}?key=${process.env.RAWG_API_KEY}`
    );

    res.json(response.data);
  } catch (error) {
    // Handle errors and send the error message as JSON
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

// Route to get platforms
router.get("/platforms", async (req, res) => {
  try {
    // Make an API call to fetch platforms and send the response data as JSON
    const response = await axios.get(
      `https://api.rawg.io/api/platforms?key=${process.env.RAWG_API_KEY}`
    );

    res.json(response.data);
  } catch (error) {
    // Handle errors and send the error message as JSON
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

// Route to get genres
router.get("/genres", async (req, res) => {
  try {
    // Make an API call to fetch genres and send the response data as JSON
    const response = await axios.get(
      `https://api.rawg.io/api/genres?key=${process.env.RAWG_API_KEY}`
    );

    res.json(response.data);
  } catch (error) {
    // Handle errors and send the error message as JSON
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

// Route to get stores
router.get("/stores", async (req, res) => {
  try {
    // Make an API call to fetch stores and send the response data as JSON
    const response = await axios.get(
      `https://api.rawg.io/api/stores?key=${process.env.RAWG_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    // Handle errors and send the error message as JSON
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

// Export the router object so it can be used in other parts of the application
module.exports = router;
