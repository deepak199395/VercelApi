const ArrivalsOrder = require("../../MongoModels/ShrigarModel/ArrivalsOrderModel");

const createArrivalsOrderController = async (req, res) => {
  try {
    const { userId, email, phone, items, totalAmount } = req.body;
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
      newOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating order",
      error: error.message,
    });
  }
};
const getArrivalsOrderController = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      orders,
      userId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving orders",
    });
  }
};

module.exports = { createArrivalsOrderController,getArrivalsOrderController };
