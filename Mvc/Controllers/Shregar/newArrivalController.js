const NewArrival = require("../../MongoModels/ShrigarModel/NewArrivalsModel");

// ✅ CREATE
const createNewArrivalController = async (req, res) => {
  try {
    const newProduct = new NewArrival(req.body);
    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: savedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating product",
      error: error.message,
    });
  }
};

// ✅ GET ALL
const getAllNewArrivalsController = async (req, res) => {
  try {
    const products = await NewArrival.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};

// ✅ GET SINGLE
const getSingleNewArrivalController = async (req, res) => {
  try {
    const product = await NewArrival.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: error.message,
    });
  }
};

// ✅ UPDATE
const updateNewArrivalController = async (req, res) => {
  try {
    // 🔥 Fix price calculation on update
    if (req.body.originalPrice && req.body.discountPercentage !== undefined) {
      req.body.priceAfterDiscount =
        req.body.originalPrice -
        (req.body.originalPrice * req.body.discountPercentage) / 100;
    }

    const updatedProduct = await NewArrival.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating product",
      error: error.message,
    });
  }
};

// ✅ DELETE
const deleteNewArrivalController = async (req, res) => {
  try {
    const deletedProduct = await NewArrival.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting product",
      error: error.message,
    });
  }
};

// ✅ EXPORT ALL
module.exports = {
  createNewArrivalController,
  getAllNewArrivalsController,
  getSingleNewArrivalController,
  updateNewArrivalController,
  deleteNewArrivalController,
};