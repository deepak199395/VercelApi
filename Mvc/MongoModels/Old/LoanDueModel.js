const mongoose = require("mongoose")

const DueLoanSchema = mongoose.Schema({
    loanId: {
        type: String,
    },
    email:{
        type:String
    },
    loanAmount: {
        type: String,
    },
    loanStartDate: {
        type: String,
    },
    loanEndDate: {
        type: String,
    },
    loanDurationInMonth: {
        type: String,
    },
    loanInterestRate: {
        type: String,
    },
    loanStatus: {
        type: String,
    },
    loanPaymentStatus: {
        type: String,
    },
    loanPaymentMode: {
        type: String,
    },
    payedEMInumber: {
        type: String,
    },
    payedEMIAmount: {
        type: String,
    },

    RemainingEMInumber: {
        type: String,
    },
    EmiAmmount: {
        type: String,
    },
    RemainingEmiAmmount: {
        type: String,
    },
    DateOfEMI: {
        type: String
    }

})
module.exports = mongoose.model("LoanDueModel", DueLoanSchema)

