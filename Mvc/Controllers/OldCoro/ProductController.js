const productModel = require("../../MongoModels/Old/ProductSchema")
const createProject = async (req, res) => {
    try {
        const { ProductNmae, ProductDescription, ProductPrice, ProductImage, ProductCategory } = req.body;
        const product = await productModel.create({
            ProductNmae,
            ProductDescription,
            ProductPrice,
            ProductImage,
            ProductCategory
        })
        res.status(201).send({ message: "Product Created Successfully", product })
    } catch (error) {
        console.log("error in create product", error)
        res.status(500).send({ message: "Error in Creating Product" })
       }
    }
const getProductsDetails = async (req, res) => {
    try {
        const products = await productModel.find()
        res.status(200).send({
            message: "Products Details",
            products
        })
    } catch (error) {
        console.log("error in products api", error)
        res.status(500).send({ message: "Error in Getting Products Details" })
      }
}
module.exports = { createProject, getProductsDetails }