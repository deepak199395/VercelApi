const DailyExpensesModel = require("../../MongoModels/foxWeb/DailyExpensesModel");
const { getExperienceController } = require("../OldCoro/ExpeianceControlller");

const ExpenseController = async (req, res) => {
  try {
    const {regiEmailId,expenses, reasonOfExpenses, dateOfExpenses} = req.body;

    const expense = await DailyExpensesModel.create({
      regiEmailId,
      expenses,
      reasonOfExpenses,
      dateOfExpenses,
    });

    res.status(200).send({
      success: true,
      flag: "green",
      message: "Expense added successfully",
      expense
    });

  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in creating expense",
      error: error.message
    });
  }
};
const getExpensseController = async (req, res) => {
  try {
    const getexpess = await DailyExpensesModel.find()
    res.status(200).send({
      success: true,
      flag: getExperienceController,
      massage: "get Expensess sucssfully",
      getexpess
    })
  } catch (error) {
    res.status(500).send({
      status: false,
      massage: "error in getting data",
      error: error.massage
    })
  }
}
const UpdateExpenssController = async (req, res) => {
  try {
    const { id } = req.params;
    const { expenses, reasonOfExpenses, dateOfExpenses } = req.body;
    const updatedExpense = await DailyExpensesModel.findByIdAndUpdate(
      id,
      { expenses, reasonOfExpenses, dateOfExpenses },
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).send({
        success: false,
        message: "Expense record not found.",
        flag: "red",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Expense updated successfully.",
      flag: "green",
      data: updatedExpense,
    });

  } catch (error) {
    console.error("Error updating expense:", error);
    return res.status(500).send({
      success: false,
      message: "Server error while updating expense.",
      error: error.message,
    });
  }
};

const DeleteExpensesController = async (req, res) => {
  try {
    const { id } = req.params;

    // Attempt to delete expense
    const deletedExpense = await DailyExpensesModel.findByIdAndDelete(id);

    // If not found
    if (!deletedExpense) {
      return res.status(404).send({
        success: false,
        message: "Expense not found.",
        flag: "red"
      });
    }

    // Success
    return res.status(200).send({
      success: true,
      message: "Expense deleted successfully.",
      flag: "green",
      data: deletedExpense
    });

  } catch (error) {
    console.error("Error deleting expense:", error);

    return res.status(500).send({
      success: false,
      message: "Server error while deleting expense.",
      error: error.message
    });
  }
};

module.exports = { ExpenseController, getExpensseController, UpdateExpenssController ,DeleteExpensesController};
