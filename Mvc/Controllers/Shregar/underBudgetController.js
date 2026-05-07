const UnderBudget = require("../../../Mvc/MongoModels/ShrigarModel/underBudgetModel");
const createUnderBudgetController = async (req, res) => {
  try {
    const { title, amount, image } = req.body;

    // Validation
    if (!title || !amount) {
      return res.status(400).json({
        success: false,
        message: "Title and amount are required",
      });
    }

    // Create Data
    const newBudget = await UnderBudget.create({
      title: title.trim(),
      amount,
      image,
    });

    return res.status(201).json({
      success: true,
      message: "Under Budget created successfully",
      data: newBudget,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUnderBudgetController = async (req, res) => {
  try {

    const data = await UnderBudget.find()
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: data.length,
      data,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleUnderBudgetController = async (req, res) => {
  try {

    const data = await UnderBudget.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    return res.status(200).json({
      success: true,
      data,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateUnderBudgetController = async (req, res) => {
  try {

    const updatedData = await UnderBudget.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedData) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Data updated successfully",
      data: updatedData,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteUnderBudgetController = async (req, res) => {
  try {

    const deletedData = await UnderBudget.findByIdAndDelete(
      req.params.id
    );

    if (!deletedData) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  createUnderBudgetController,
  getUnderBudgetController,
  getSingleUnderBudgetController,
  updateUnderBudgetController,
  deleteUnderBudgetController,
};