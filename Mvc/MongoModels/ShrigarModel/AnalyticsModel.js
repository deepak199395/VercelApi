const mongoose = require("mongoose");

const screenTrackSchema = new mongoose.Schema({
  userId: String,

  sessionId: {
    type: String,
    required: true,
  },

  screen: {
    type: String, // "HOME", "PRODUCT", "CART"
    required: true,
  },

  screenKey: {
    type: String, // "isHome", "isProduct"
  },

  productId: String,

  startTime: {
    type: Date,
    default: Date.now,
  },

  endTime: {
    type: Date,
    default: null,
  },

  duration: {
    type: Number, // seconds
    default: 0,
  },
});

module.exports = mongoose.model("ScreenTrack", screenTrackSchema);
