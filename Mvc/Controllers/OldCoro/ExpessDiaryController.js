const ExpessDiaryModel = require("../../MongoModels/Old/ExpessDiaryModel");

const createExpessDiaryController = async (req, res) => {
    try {
        const { name, email, phone, address, income, bank, pan, limit,folioNumber } = req.body;
        const newExpessDiary = await ExpessDiaryModel.create({
            name,
            email,
            phone,
            address,
            income,
            bank,
            pan,
            limit,
            folioNumber,
        })
        res.status(201).send({
            success: true,
            message: "Expess Diary created successfully",
            data: newExpessDiary
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in creating Expess Diary",
            error: error.message
         });
        }}
const getExpessDiaryController = async (req, res) => {
    try {
        const expessDiary = await ExpessDiaryModel.find();
        res.status(200).send({
            success: true,
            message: "Expess Diary fetched successfully",
            data: expessDiary
        });
        
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in fetching Expess Diary",
            error: error.message
        });
        
    }
}
module.exports = {createExpessDiaryController, getExpessDiaryController};