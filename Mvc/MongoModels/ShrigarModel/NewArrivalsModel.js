const mongoose = require("mongoose");

const NewArrivalSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },

    // 🔥 Multiple images support
    images: [
      {
        type: String,
        required: true,
      },
    ],

    description: {
      type: String,
      required: true,
      trim: true,
    },

    originalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    discountPercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    priceAfterDiscount: {
      type: Number,
      default: 0,
    },

    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// 🔥 Auto-calculate discounted price
NewArrivalSchema.pre("save", function (next) {
  if (this.originalPrice && this.discountPercentage !== undefined) {
    this.priceAfterDiscount =
      this.originalPrice -
      (this.originalPrice * this.discountPercentage) / 100;
  }
  next();
});

module.exports = mongoose.model("NewArrival", NewArrivalSchema);