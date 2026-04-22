const mongoose = require("mongoose")

const expenseSchema = mongoose.Schema({
  DayAmmount: {
    type: String,
  },
  date: {
    type: String,
  },
  description: {
    type: String,
  },

})
module.exports= mongoose.model("ExpessModel",expenseSchema)

