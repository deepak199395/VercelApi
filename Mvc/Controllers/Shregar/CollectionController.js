const Collection= require("../../MongoModels/ShrigarModel/CollectionModel.js")
const CreateCollectionController=async(req,res)=>{
    try {
        const {name,description,image}=req.body
        const newCollection = await Collection.create({
            name,
            description,
            image
         })
        res.status(201).json({
            message:"Collection created successfully",
            success: true,
            flage:"Y",
            newCollection
        })
    } catch (error) {
        res.status(500).json({
            message:"Error creating collection",
            success: false,
            flage:"N",
            error:error.message
        })
    }
}
const getCollectionController=async(req,res)=>{
    try {
        const collection= await Collection.find()
        res.status(200).json({
            message:"Collection retrieved successfully",
            success: true,
            flage:"Y",
            collection
        })
        
    } catch (error) {
        res.status(500).json({
            message:"Error retrieving collection",
            success: false,
            flage:"N",
            error:error.message
        })
    }
}
const getCollectionByIdController=async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}

module.exports={CreateCollectionController,getCollectionController}