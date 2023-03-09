// const { stringify } = require("crypto-js/enc-base64");
const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: {
    unique: true,
    type: String,
  },
  account: {
    username: {
      required: true,
      type: String,
    },
    avatar: Object,
    favorites: [
      {
        gameId: Number,
        game_name: String,
        game_image: String,
      },
    ],
  },
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;
