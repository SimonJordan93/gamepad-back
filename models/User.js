// const { stringify } = require("crypto-js/enc-base64");
const mongoose = require("mongoose");
const { arrayBuffer } = require("node:stream/consumers");

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
    collection: Array,
    wishlist: Array,
  },
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;
