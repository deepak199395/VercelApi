const mongoose = require("mongoose");

const foxCreateEmiSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: false,
  },
  FinanceCompany:{
    type: String,
    required: false,
  },
  customerName: {
    type: String,
    required: false,
  },
  registeredEmail: {
    type: String,
    required: false,
  },
  registeredMobile: {
    type: String,
    required: false,
  },
  branch: {
    type: String,
    required: false,
  },
  productType: {
    type: String,
    default: '',
  },
  repaymentBank: {
    type: String,
    default: '',
  },

  // Loan Details
  loanAmount: {
    type: Number,
    required: [true, "Loan Amount is required"],
  },
  rateOfInterestPerAnnum: {
    type: String,
    required: [true, "Rate of Interest is required"],
  },
  interestRateType: {
    type: String,
    default: 'Fixed',
  },
  loanTenureInMonths: {
    type: Number,
    required: [true, "Loan tenure (in months) is required"],
  },
  RemainloanTenureInMonths: {
    type: Number,
    required: [true, "Loan tenure (in months) is required"],
  },
  totalLoanAmountRepaid: {
    type: Number,
    default: 0,
  },
  instalmentAmount: {
    type: Number,
    default: 0,
  },
  loanCreationDate: {
    type: String,
  },
  firstInstalmentDate: {
    type: String,
  },
  instalmentEndDate: {
    type: String,
  },
  totalOutstandingAmount: {
    type: Number,
    default: 0,
  },
  outstandingLoanAmount: {
    type: Number,
    default: 0,
  },
  futurePrincipalComponent: {
    type: Number,
    default: 0,
  },
  futureInterestComponent: {
    type: Number,
    default: 0,
  },
  futureInstalmentNumber: {
    type: Number,
    default: 0,
  },
  loanStatus: {
    type: String,
    default: "Active",
  },
}, { timestamps: true });

// Export Model
module.exports = mongoose.model("FoxCreateEmi", foxCreateEmiSchema);
