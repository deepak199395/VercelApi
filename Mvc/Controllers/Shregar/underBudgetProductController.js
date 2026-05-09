const UnderBudgetProduct = require("../../../Mvc/MongoModels/ShrigarModel/underBudgetProductModel");
const createUnderBudgetProductController = async (req, res) => {
  try {
    const {
      UnderBudgetId,
      productName,
      description,
      originalPrice,
      discountPercentage,
      imageUrl,
    } = req.body;
    // validations
    if (
      !UnderBudgetId ||
      !productName ||
      !description ||
      !originalPrice ||
      !discountPercentage ||
      !imageUrl
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // Create Product
    const newProduct = await UnderBudgetProduct.create({
      UnderBudgetId,
      productName,
      description,
      originalPrice,
      discountPercentage,
      imageUrl,
      inStock,
    });
    return res.status(201).json({
      success: true,
      message: "Under Budget Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUnderBudgetProductController = async (req, res) => {
  try {
    const products = await UnderBudgetProduct.find({
      UnderBudgetId: req.params.id,
    }).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteUnderBudgetProductController = async (req, res) => {
  try {
    const deletedProduct = await UnderBudgetProduct.findByIdAndDelete(
      req.params.id,
    );

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  createUnderBudgetProductController,
  getUnderBudgetProductController,
  deleteUnderBudgetProductController,
};
