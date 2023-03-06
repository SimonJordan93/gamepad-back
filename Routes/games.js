const express = require("express");
const router = express.Router();
const axios = require("axios");

// Games Route
router.get("/games", async (req, res) => {
  try {
    const search = req.query.search || "";
    const page = req.query.page || 1;
    let parent_platforms = req.query.parent_platforms;
    let genres = req.query.genres;
    let stores = req.query.stores;
    let ordering = req.query.ordering;

    let url = `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&page=${page}&search_precise=true&search=${search}`;

    if (parent_platforms) {
      url += `&parent_platforms=${parent_platforms}`;
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

module.exports = router;
