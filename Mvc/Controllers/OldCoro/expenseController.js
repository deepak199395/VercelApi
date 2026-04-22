const ExpessModel = require("../../MongoModels/Old/CoroexpenseModel")

const CreateExpessController = async (req, res) => {
  try {
    const { DayAmmount, date, description } = req.body
    const creatExpess = await ExpessModel.create({
      DayAmmount,
      date,
      description
    })
    res.status(201).send({
      success: true,
      message: "Expense created successfully",
      data: creatExpess
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error creating expense",
      error: error.message
    })

  }
}
const getExpessController = async (req, res) => {
  try {
    const getExpess = await ExpessModel.find()
    res.status(201).send({
      success: true,
      message: "Expense fetched successfully",
      data: getExpess
    })

  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching expense",
      error: error.message
    })

  }
}
const updateExpenssController = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const { DayAmmount, date, description } = req.body;

    const updated = await ExpessModel.findByIdAndUpdate(
      expenseId,
      { DayAmmount, date, description },
      { new: true }
    );

    if (!updated) {
      return res.status(404).send({
        success: false,
        message: "Expense not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Expense updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error updating expense",
      error: error.message,
    });
  }
};

const DeleteExpenssController = async (req, res) => {
  try {
    const expenseId = req.params.id;

    const deletedExpense = await ExpessModel.findByIdAndDelete(expenseId);

    if (!deletedExpense) {
      return res.status(404).send({
        success: false,
        message: "Expense not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Expense deleted successfully",
      data: deletedExpense,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error deleting expense",
      error: error.message,
    });
  }
};


module.exports = { CreateExpessController, getExpessController, updateExpenssController, DeleteExpenssController };

