const mongoose = require("mongoose");

const ArrivalsOrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    email: String,
    phone: String,

    // 🔥 ADDRESS (VERY IMPORTANT)
    address: {
      fullName: String,
      phoneNumber: String,
      addressLine: String,
      city: String,
      state: String,
      pincode: String,
      country: String,
    },

    // 🔥 MATCH FRONTEND CART STRUCTURE
    items: [
      {
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        image: String,
        price: Number,
        quantity: Number,
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

// 🔥 AUTO TOTAL (optional but useful)
ArrivalsOrderSchema.pre("save", function (next) {
  if (this.items && this.items.length > 0) {
    this.totalAmount = this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }
  next();
});

module.exports = mongoose.model("NewArrival", ArrivalsOrderSchema);