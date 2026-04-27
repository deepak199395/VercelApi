const mongoose = require("mongoose");

const screenTrackSchema = new mongoose.Schema({
  userId: String,

  email: String,
  phone: String,

  sessionId: {
    type: String,
    required: true,
    index: true,
  },

  screen: {
    type: String,
    required: true,
    index: true,
  },

  screenKey: String,
  productId: String,

  startTime: {
    type: Date,
    default: Date.now,
    index: true,
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
