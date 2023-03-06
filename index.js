require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// RAWG API Routes
const GamesRouter = require("./Routes/games");
const GameRouter = require("./Routes/game");
const PlatformsRouter = require("./Routes/platforms");
const GenresRouter = require("./Routes/genres");
const StoresRouter = require("./Routes/stores");

// Use Routes
app.use(GamesRouter);
app.use(GameRouter);
app.use(PlatformsRouter);
app.use(GenresRouter);
app.use(StoresRouter);

// Error Route
app.all("*", (req, res) => {
  res.status(404).json({ message: " 404 ERROR This route doesn't exist" });
});

// Server Port
app.listen(process.env.PORT, () => {
  console.log("Server started");
});
