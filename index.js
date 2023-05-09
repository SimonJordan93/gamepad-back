require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI);

// RAWG API Routes
const GamesRouter = require("./Routes/games");

// DataBase Routes
const UserRouter = require("./Routes/user");
const ReviewRouter = require("./Routes/reviews");
const CollectionRouter = require("./Routes/collection");

// Use Routes
app.use(GamesRouter);
app.use(UserRouter);
app.use(ReviewRouter);
app.use(CollectionRouter);

// Error Route
app.all("*", (req, res) => {
  res.status(404).json({ message: " 404 ERROR This route doesn't exist" });
});

// Server Port
app.listen(process.env.PORT, () => {
  console.log("Server started");
});
