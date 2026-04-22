const mongoose = require('mongoose');

const DailyExpensesSchema = new mongoose.Schema(
  {
    regiEmailId: {
      type: String,
      required: true,
      trim: true
    },
    expenses: {
      type: String,
      required: true,
      trim: true
    },

    reasonOfExpenses: {
      type: String,
      required: true,
      trim: true
    },

    dateOfExpenses: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("DailyExpenses", DailyExpensesSchema);
