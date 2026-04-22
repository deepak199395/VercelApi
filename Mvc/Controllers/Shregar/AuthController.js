const userModel = require("../../MongoModels/ShrigarModel/ShringaarAuthModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= REGISTER USER =================
const registerController = async (req, res) => {
  try {
    const {
      FullName,
      phoneNumber,
      Email,
      Password,
      Dob,
      age,
      Address,
      City,
      State,
      Pincode,
      Country,
      Gender,
    } = req.body;

    // Validation
    if (!FullName || !phoneNumber || !Email || !Password) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ Email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already registered with this email",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    // Create user
    const newUser = await userModel.create({
      FullName,
      phoneNumber,
      Email,
      Password: hashedPassword,
      Dob,
      age,
      Address,
      City,
      State,
      Pincode,
      Country,
      Gender,
      });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: newUser._id,
        Email: newUser.Email,
        phoneNumber: newUser.phoneNumber,
        FullName: newUser.FullName,
        Dob: newUser.Dob,
        age: newUser.age,
        Address: newUser.Address,
        City: newUser.City,
        State: newUser.State,
        Pincode: newUser.Pincode,
        Country: newUser.Country,
        Gender: newUser.Gender,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ================= GET ALL USERS =================
const getAllUserController = async (req, res) => {
  try {
    const users = await userModel.find().select("-Password");

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

// ================= GET SINGLE USER =================
const getSingleUsersController = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.params.id)
      .select("-Password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error: error.message,
    });
  }
};

// ================= UPDATE USER =================
const UpdateUserController = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // If password updating → hash it
    if (updateData.Password) {
      const salt = await bcrypt.genSalt(10);
      updateData.Password = await bcrypt.hash(updateData.Password, salt);
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select("-Password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Update failed",
      error: error.message,
    });
  }
};

// ================= DELETE USER =================
const DeleteUserController = async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Delete failed",
      error: error.message,
    });
  }
};

// ================= LOGIN USER =================
const UserloginController = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password required",
      });
    }

    const user = await userModel.findOne({ Email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, Email: user.Email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        FullName: user.FullName,
        Email: user.Email,
        FullName: user.FullName,
        phoneNumber: user.phoneNumber,
        Address: user.Address,
        City: user.City,
        State: user.State,
        Pincode: user.Pincode,
        Country: user.Country,
        Gender: user.Gender,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

module.exports = {
  registerController,
  getAllUserController,
  getSingleUsersController,
  UpdateUserController,
  DeleteUserController,
  UserloginController,
};