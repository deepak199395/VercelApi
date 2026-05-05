const ArrivalsOrder = require("../../MongoModels/ShrigarModel/ArrivalsOrderModel");


// 🔥 CREATE ORDER
const createArrivalsOrderController = async (req, res) => {
  try {
    const { userId, email, phone, items, totalAmount } = req.body;

    // ✅ validation
    if (!userId || !totalAmount) {
      return res.status(400).json({
        success: false,
        message: "userId and totalAmount are required",
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No items in order",
      });
    }

    const newOrder = await ArrivalsOrder.create({
      userId,
      email,
      phone,
      items,
      totalAmount,
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

    // ✅ validation
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    // 🔥 FIXED HERE (use correct model)
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