const StaffModel = require("../../MongoModels/ShrigarModel/StaffModel");
const CreateStaffController = async (req, res) => {
    try {

        const {
            category,
            staffName,
            age,
            empNumber,
            dob,
            salary,
            city,
            position,
            dateOfJoining,
            lastWorkingDay
        } = req.body;


        const newStaff = await StaffModel.create({
            category,
            staffName,
            age,
            empNumber,
            dob,
            salary,
            city,
            position,
            dateOfJoining,
            lastWorkingDay
        });

        res.status(201).json({
            message: "Staff created successfully",
            success: true,
            flage: "Y",
            newStaff
        });

    } catch (error) {

        res.status(500).json({
            message: "Error creating staff",
            success: false,
            flage: "N",
            error: error.message
        });

    }
};

const GetAllStaffController = async (req, res) => {
    try {

        const staff = await StaffModel.find().sort({ createdAt: -1 });

        res.status(200).json({
            message: "Staff fetched successfully",
            success: true,
            flage: "Y",
            total: staff.length,
            staff
        });

    } catch (error) {

        res.status(500).json({
            message: "Error fetching staff",
            success: false,
            flage: "N",
            error: error.message
        });

    }
};



// ================= GET STAFF BY CATEGORY =================

const GetStaffByCategoryController = async (req, res) => {
    try {

        const { category } = req.params;

        const staff = await StaffModel.find({ category });

        res.status(200).json({
            message: "Category staff fetched successfully",
            success: true,
            flage: "Y",
            total: staff.length,
            staff
        });

    } catch (error) {

        res.status(500).json({
            message: "Error fetching category staff",
            success: false,
            flage: "N",
            error: error.message
        });

    }
};
const UpdateStaffController = async (req, res) => {
    try {

        const updatedStaff = await StaffModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            message: "Staff updated successfully",
            success: true,
            flage: "Y",
            updatedStaff
        });

    } catch (error) {

        res.status(500).json({
            message: "Error updating staff",
            success: false,
            flage: "N",
            error: error.message
        });

    }
};
const DeleteStaffController = async (req, res) => {
    try {

        await StaffModel.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Staff deleted successfully",
            success: true,
            flage: "Y"
        });

    } catch (error) {

        res.status(500).json({
            message: "Error deleting staff",
            success: false,
            flage: "N",
            error: error.message
        });

    }
};
module.exports = {
    CreateStaffController,
    GetAllStaffController,
    GetStaffByCategoryController,
    UpdateStaffController,
    DeleteStaffController
};