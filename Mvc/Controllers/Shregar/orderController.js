const Order = require("../../MongoModels/ShrigarModel/OrderModel");
const sendOrderEmail = require("../../../utils/sendEmail");

const createOrderController = async (req, res) => {
  try {
    console.log("🟡 ===== CREATE ORDER API HIT =====");
    console.log("🟡 CREATE ORDER CONTROLLER HIT");
    const { userId, items, address, totalAmount, email } = req.body;

    console.log("📥 Incoming Data:");
    console.log("userId:", userId);
    console.log("email:", email);
    console.log("items length:", items?.length);
    console.log("totalAmount:", totalAmount);
    console.log("address:", address);

    // 🔴 Validation check
    if (
      !userId ||
      !items ||
      items.length === 0 ||
      !address ||
      !totalAmount ||
      !email
    ) {
      console.log("❌ VALIDATION FAILED");

      return res.status(400).json({
        success: false,
        message: "Missing order data",
      });
    }

    // 🟢 Create Order
    const order = await Order.create({
      userId,
      items,
      address,
      totalAmount,
    });

    console.log("📦 ORDER CREATED SUCCESSFULLY:", order._id);

    // 🔵 Call Email Function
    console.log("📧 Calling sendOrderEmail...");
    
    await sendOrderEmail(order, email)
      .then(() => {
        console.log("✅ EMAIL SENT SUCCESSFULLY");
      })
      .catch((err) => {
        console.error("❌ EMAIL FAILED:", err);
      });

    console.log("🟢 Sending API Response");

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });

  } catch (error) {
    console.error("🔥 ORDER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const getMyOrdersController = async (req, res) => {
  try {
    const { userId } = req.query;

    let filter = {};

    if (userId) {
      filter.userId = new mongoose.Types.ObjectId(userId);
    }

    const orders = await Order.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleOrderController = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "items.productId",
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateOrderStatusController = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: status },
      { new: true },
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrderController,
  getMyOrdersController,
  getSingleOrderController,
  updateOrderStatusController,
};
