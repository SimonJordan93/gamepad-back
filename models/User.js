// Import the Mongoose library to help with MongoDB object modeling
const mongoose = require("mongoose");

// Import the arrayBuffer consumer from the 'node:stream/consumers' module
const { arrayBuffer } = require("node:stream/consumers");

// Define the User model schema using Mongoose
const User = mongoose.model("User", {
  // The email field is a unique String type
  email: {
    unique: true,
    type: String,
  },
  // The account field is an object with nested fields
  account: {
    // The username field is a required String type
    username: {
      required: true,
      type: String,
    },
    // The avatar field is an Object type for storing user profile image metadata
    avatar: Object,
    // The collection field is an Array type for storing a list of user's items
    collection: Array,
    // The wishlist field is an Array type for storing a list of desired items
    wishlist: Array,
  },
  // The token field is a String type for storing user authentication tokens
  token: String,
  // The hash field is a String type for storing the user's password hash
  hash: String,
  // The salt field is a String type for storing the user's password salt
  salt: String,
});

// Export the User model so it can be imported and used in other parts of the application
module.exports = User;
