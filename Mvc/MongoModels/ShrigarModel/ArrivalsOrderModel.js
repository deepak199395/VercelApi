const mongoose = require("mongoose");

const ArrivalsOrderorderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    email: String,
    phone: String,

    items: [
      {
        productId: mongoose.Schema.Types.ObjectId,
        productName: String,
        description: String,
        price: Number,
        qty: Number,
        image: String,
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    orderStatus: {
      type: String,
      default: "Pending", 
    },

    paymentStatus: {
      type: String,
      default: "Success",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ArrivalsOrder", ArrivalsOrderorderSchema);