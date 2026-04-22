const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },

      productName: {
        type: String,
        required: true
      },

      image: {
        type: String
      },

      description: {
        type: String
      },

      qty: {
        type: Number,
        required: true,
        min: 1
      },

      price: {
        type: Number,
        required: true
      },

      originalPrice: {
        type: Number
      },

      discountPercentage: {
        type: Number
      },

      priceAfterDiscount: {
        type: Number
      },

      inStock: {
        type: Boolean
      },

      collectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection"
      }
    }
  ],

  address: {
    fullName: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    addressLine: {
      type: String,
      required: true
    },

    city: {
      type: String,
      required: true
    },

    state: {
      type: String,
      required: true
    },

    pincode: {
      type: String,
      required: true
    }
  },

  totalAmount: {
    type: Number,
    required: true
  },

  paymentStatus: {
    type: String,
    enum: ["PENDING", "PAID", "FAILED"],
    default: "PENDING"
  },

  orderStatus: {
    type: String,
    enum: ["PLACED", "SHIPPED", "DELIVERED", "CANCELLED"],
    default: "PLACED"
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);