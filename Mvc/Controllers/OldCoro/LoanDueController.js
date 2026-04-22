const LoanDueModel = require("../../MongoModels/Old/LoanDueModel")
const DueLoanController = async (req, res) => {
    try {
        const {
            loanId,
            email,
            loanAmount,
            loanStartDate,
            loanEndDate,
            loanDurationInMonth,
            loanInterestRate,
            loanStatus,
            loanPaymentStatus,
            loanPaymentMode,
            payedEMInumber,
            DateOfEMI,
            RemainingEMInumber,
            RemainingEmiAmmount,
            EmiAmmount,
            payedEMIAmount
        } = req.body
        const DueLoan = await LoanDueModel.create({
            loanId,
            email,
            loanAmount,
            loanStartDate,
            loanEndDate,
            loanDurationInMonth,
            loanInterestRate,
            loanStatus,
            loanPaymentStatus,
            loanPaymentMode,
            payedEMInumber,
            EmiAmmount,
            DateOfEMI,
            RemainingEMInumber,
            RemainingEmiAmmount,
            payedEMIAmount
        })
        res.status(201).send({
            message: "Loan Due Created Successfully",
            success: true,
            data: DueLoan
        })
    } catch (error) {
        res.status(500).send({
            message: "Error Occured",
            success: false,
            error: error.message
        })
    }
}

const getLoandeuDetailsController = async (req, res) => {
    try {
        const loandue = await LoanDueModel.find()
        res.status(200).send({
            message: "Loan Due Details Fetched Successfully",
            success: true,
            data: loandue
        })

    } catch (error) {
        res.status(500).send({
            message: "Error Occured",
            error: error.message
        })


    }

}
const updateLoanController = async (req, res) => {
  try {
    const { id } = req.params; 

    const updateData = req.body;

    const updatedLoan = await LoanDueModel.findByIdAndUpdate(id, updateData, {
      new: true, 
      runValidators: true 
    });

    if (!updatedLoan) {
      return res.status(404).send({
        message: "Loan record not found",
        success: false,
      });
    }

    res.status(200).send({
      message: "Loan Due updated successfully",
      success: true,
      data: updatedLoan
    });

  } catch (error) {
    res.status(500).send({
      message: "Error updating loan",
      success: false,
      error: error.message
    });
  }
};


module.exports = { DueLoanController, getLoandeuDetailsController,updateLoanController };
