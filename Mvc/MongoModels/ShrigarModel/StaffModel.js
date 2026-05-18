const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["onStore", "offStore", "adminStore", "exEmployees"],
      required: true,
    },

    staffName: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
    },

    empNumber: {
      type: String,
      required: true,
      unique: true,
    },

    dob: {
      type: Date,
    },

    salary: {
      type: Number,
    },

    city: {
      type: String,
    },

    position: {
      type: String,
    },

    dateOfJoining: {
      type: Date,
    },

    lastWorkingDay: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Staff", staffSchema);