const mongoose = require("mongoose");

const underBudgetProductSchema =
  new mongoose.Schema(
    {
      UnderBudgetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UnderBudget",
        required: true,
      },

      productName: {
        type: String,
        required: true,
        trim: true,
      },

      description: {
        type: String,
        required: true,
      },

      originalPrice: {
        type: Number,
        required: true,
      },

      discountPercentage: {
        type: Number,
        required: true,
      },

      imageUrl: {
        type: String,
        required: true,
      },

      inStock: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model("UnderBudgetProduct",underBudgetProductSchema);