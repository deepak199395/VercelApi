const Categories = require("../../MongoModels/ShrigarModel/CategoriesModel.js")

const CreateCategoriesController = async (req, res) => {
    try {
        const { name, description, image } = req.body;
        const newCategories = await Categories.create({
            name,
            description,
            image
        })
        res.status(201).json({
            message: "Categories created successfully",
            success: true,
            flage: "Y",
            newCategories
        })
    } catch (error) {
        res.status(500).json({
            message: "Error creating Categories",
            success: false,
            flage: "N",
            error: error.message
        })
    }
}
const getCategoriesController = async (req, res) => {
    try {
        const Allcategories = await Categories.find()
        res.status(200).json({
            message: "Categories retrieved successfully",
            success: true,
            flage: "Y",
            Allcategories
        })
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving Categories",
            success: false,
            flage: "N",
            error: error.message
        })
    }
}
module.exports = { CreateCategoriesController, getCategoriesController }