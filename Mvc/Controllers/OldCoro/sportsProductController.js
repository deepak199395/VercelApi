const { Sportsproduct } = require("../../models")
exports.createProduct = async (req, res) => {
    try {
        const { ProductNmae, projectDescription, price, image, productCategory } = req.body;
        const newProduct = await Sportsproduct.create({
            ProductNmae,
            projectDescription,
            price,
            image,
            productCategory

        })
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(500).json({ error: "Error creating product", details: error.message });

    }
}
exports.getProductDetails = async (req, res) => {
    try {
        const products = await Sportsproduct.findByPk(req.params.id)
        if (!products) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(products)
    } catch (error) {
        console.log("error in getting produvts details", error)
        res.status(500).json({ error: "Error getting products", details: error.message });

    }
}
exports.getAllProducts =async(req,res)=>{
    try {
        const allproducts= await Sportsproduct.findAll()
        res.status(200).json(allproducts)

    } catch (error) {
        console.log("error in fatching all products ",error)
        res.status(500).json({ error: "Error getting products", details: error.message });
    }

}