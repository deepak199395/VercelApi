const Bankmodel= require("../../MongoModels/Old/RealCodeModel")
const BankDetailsController = async (req, res) => {
  try {
    const { accnum,acctype,number,email,emailadd} = req.body;

    const newBank = await Bankmodel.create({
      accnum,
      acctype,
      number,
      email,
      emailadd
    });

    res.status(201).json({
      message: "Account informa on submi ed successfully",
      success: true,
      newBank
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Missing or invalid fields",
      error: error.message
    });
  }
};

module.exports = BankDetailsController;
