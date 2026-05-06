const ArrivalsOrder = require("../../MongoModels/ShrigarModel/ArrivalsOrderModel");


// 🔥 CREATE ORDER
const createArrivalsOrderController = async (req, res) => {
  try {
    const { userId, email, phone, items, address } = req.body;

    // ✅ validation
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No items in order",
      });
    }

    if (!address || !address.addressLine) {
      return res.status(400).json({
        success: false,
        message: "Address is required",
      });
    }

    // 🔥 CREATE ORDER
    const newOrder = await ArrivalsOrder.create({
      userId,
      email,
      phone,
      address,
      items,
      // ❌ no need to pass totalAmount (auto calculated)
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: newOrder,
    });

  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Error creating order",
      error: error.message,
    });
  }
};


// 📦 GET USER ORDERS
const getArrivalsOrderController = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    const orders = await ArrivalsOrder
      .find({ userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: orders,
    });

  } catch (error) {
    console.error("GET ORDER ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Error retrieving orders",
    });
  }
};

module.exports = {
  createArrivalsOrderController,
  getArrivalsOrderController,
};