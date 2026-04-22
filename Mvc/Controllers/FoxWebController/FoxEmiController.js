const EmiModel = require("../../MongoModels/foxWeb/FoxCreateEmiModel");
// ===============================================
// Create EMI Controller
// ===============================================
const Emicontroller = async (req, res) => {
  try {
    const {
      customerId,
      FinanceCompany,
      customerName,
      registeredEmail,
      registeredMobile,
      branch,
      productType,
      repaymentBank,
      loanAmount,
      rateOfInterestPerAnnum,
      interestRateType,
      loanTenureInMonths,
      RemainloanTenureInMonths,
      totalLoanAmountRepaid,
      instalmentAmount,
      loanCreationDate,
      firstInstalmentDate,
      instalmentEndDate,
      totalOutstandingAmount,
      outstandingLoanAmount,
      futurePrincipalComponent,
      futureInterestComponent,
      futureInstalmentNumber,
      loanStatus,
    } = req.body;

    // Basic validation
    // if (!customerName || !FinanceCompany || !loanAmount || !rateOfInterestPerAnnum || !loanTenureInMonths || !RemainloanTenureInMonths) {
    //   return res.status(400).json({
    //     status: false,
    //     message: "Please provide required fields: customerName, loanAmount, rateOfInterestPerAnnum, and loanTenureInMonths.",
    //     flag: "red",
    //   });
    // }
    // Create EMI record
    const emi = await EmiModel.create({
      customerId,
      FinanceCompany,
      customerName,
      registeredEmail,
      registeredMobile,
      branch,
      productType,
      repaymentBank,
      loanAmount,
      rateOfInterestPerAnnum,
      interestRateType,
      loanTenureInMonths,
      RemainloanTenureInMonths,
      totalLoanAmountRepaid,
      instalmentAmount,
      loanCreationDate,
      firstInstalmentDate,
      instalmentEndDate,
      totalOutstandingAmount,
      outstandingLoanAmount,
      futurePrincipalComponent,
      futureInterestComponent,
      futureInstalmentNumber,
      loanStatus,
    });

    res.status(201).json({
      status: true,
      message: "EMI data created successfully",
      flag: "green",
      emi,
    });
  } catch (error) {
    console.error("Error while creating EMI:", error);
    res.status(500).json({
      status: false,
      flag:"red",
      message: "Error while creating EMI in database",
      error: error.message,
    });
  }
};
// ===============================================
// Get All EMI Details Controller
// ===============================================
const getEMIdetailsController = async (req, res) => {
  try {
    const allEmi = await EmiModel.find();

    res.status(200).json({
      status: true,
      flag:"green",
      message: "EMI records retrieved successfully",
      total: allEmi.length,
      allEmi,
    });
  } catch (error) {
    console.error("Error while fetching EMI details:", error);
    res.status(500).json({
      status: false,
      flage:"red",
      message: "Error while fetching EMI details from database",
      error: error.message,
    });
  }
};

module.exports = { Emicontroller, getEMIdetailsController };
