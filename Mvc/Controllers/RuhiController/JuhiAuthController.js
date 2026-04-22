const JuhiAuthModel = require("../../MongoModels/JuhiModel/JuhiAuthModel");
const regiController = async (req, res) => {
  try {
    const { FullName, phoneNumber, Email, Password, age } = req.body;

    // Convert age to number (important)
    const userAge = Number(age);

    if (!userAge) {
      return res.status(400).json({
        success: false,
        message: "Age is required",
      });
    }

    const isMinor = userAge < 18;
    const isMajor = userAge >= 18;

    // Create user
    const newUser = await JuhiAuthModel.create({
      FullName,
      phoneNumber,
      Email,
      Password,
      age: userAge,
    });

    // Age Check Message
    const ageStatus = userAge < 18 ? "User is under age" : "User is 18+";

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      isMinor,
      isMajor,
      ageMessage: ageStatus,
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User registration failed",
      error: error.message,
    });
  }
};
const getUserController = async (req, res) => {
  try {
    const users = await JuhiAuthModel.find();

    // Add isMinor & isMajor dynamically
    const updatedUsers = users.map((user) => {
      const userAge = Number(user.age);

      return {
        ...user._doc,
        isMinor: userAge < 18,
        isMajor: userAge >= 18,
      };
    });

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      flag: "green",
      data: updatedUsers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      flag: "red",
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};
const getSingleUserController = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await JuhiAuthModel.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error: error.message,
    });
  }
};
const loginController = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    const user = await JuhiAuthModel.findOne({ Email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.Password !== Password) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const userAge = Number(user.age);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      isMinor: userAge < 18,
      isMajor: userAge >= 18,
      user: {
        _id: user._id,
        FullName: user.FullName,
        Email: user.Email,
        age: user.age
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};
module.exports = {
  regiController,
  getUserController,
  getSingleUserController,
  loginController,
};
