// Import the Mongoose library to help with MongoDB object modeling
const mongoose = require("mongoose");

// Define the User model schema using Mongoose
const UserSchema = new mongoose.Schema({
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
  },
  // Reference to the Favorites Items added by user
  favouritesItem: [
    { type: mongoose.Schema.Types.ObjectId, ref: "FavouritesItem" },
  ],
  // The token field is a String type for storing user authentication tokens
  token: String,
  // The hash field is a String type for storing the user's password hash
  hash: String,
  // The salt field is a String type for storing the user's password salt
  salt: String,
});

// Define the User model using the UserSchema
const User = mongoose.model("User", UserSchema);

// Export the User model so it can be imported and used in other parts of the application
module.exports = User;
