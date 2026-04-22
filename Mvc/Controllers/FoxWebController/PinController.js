const PinModel=require("../../MongoModels/foxWeb/PinModel")

const CreatNewPinController = async (req, res) => {
  try {
    const { regiEmailId, EnterPin, confirmPin } = req.body;

    // Basic validation
    if (!regiEmailId || !EnterPin || !confirmPin) {
      return res.status(400).send({
        success: false,
        flag: "red",
        message: "All fields are required.",
      });
    }

    // PIN match check
    if (EnterPin !== confirmPin) {
      return res.status(400).send({
        success: false,
        flag: "red",
        message: "PIN and Confirm PIN do not match.",
      });
    }

    // PIN length validation
    if (EnterPin.length < 4) {
      return res.status(400).send({
        success: false,
        flag: "red",
        message: "PIN must be at least 4 digits.",
      });
    }
    const newpin = await PinModel.create({
      regiEmailId,EnterPin,
    });
    return res.status(200).send({
      success: true,
      flag: "green",
      message: "Your PIN has been created successfully.",
       newpin,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error creating PIN",
      error: error.message,
    });
  }
};
const getPinController = async (req, res) => {
  try {
    const pins = await PinModel.find();

    return res.status(200).send({
      success: true,
      flag: "green",
      message: "PIN details fetched successfully.",
      data: pins
    });

  } catch (error) {
    console.error("Error while fetching PIN details:", error);

    return res.status(500).send({
      success: false,
      flag: "red",
      message: "Error fetching PIN details.",
      error: error.message,
    });
  }
};

const VerifyPinController = async (req, res) => {
  try {
    const { regiEmailId, EnterPin } = req.body;

    if (!regiEmailId || !EnterPin) {
      return res.status(400).send({
        success: false,
        flag: "red",
        message: "Email and PIN are required.",
      });
    }

    const userPin = await PinModel.findOne({ regiEmailId });

    if (!userPin) {
      return res.status(404).send({
        success: false,
        flag: "red",
        message: "No PIN found for this email.",
      });
    }

    // Direct PIN comparison (NO bcrypt)
    if (userPin.EnterPin !== EnterPin) {
      return res.status(401).send({
        success: false,
        flag: "red",
        message: "Incorrect PIN.",
      });
    }

    // SUCCESS
    return res.status(200).send({
      success: true,
      flag: "green",
      message: "PIN Verified Successfully.",
    });

  } catch (error) {
    console.error("Error verifying PIN:", error);
    return res.status(500).send({
      success: false,
      flag: "red",
      message: "Server error while verifying PIN.",
      error: error.message,
    });
  }
};


module.exports = { CreatNewPinController ,getPinController,VerifyPinController};
