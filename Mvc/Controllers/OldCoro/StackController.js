const StackModel= require("../../MongoModels/Old/StackModel")

const createStackController=async(req,res)=>{
   try {
    const {stackName,stackDescription,expImage,expYear}=req.body;
    const newStack= await StackModel.create({
        stackName,
        stackDescription,
        expImage,
        expYear
    })
    res.status(201).send({
        message:"Stack created successfully",
        newStack
    })
   } catch (error) {
    res.status(500).send({
        message:"Error creating stack",
        error
    })
 }
}
const getStackController=async(req,res)=>{
  try {
    const stack= await StackModel.find()
    res.status(200).send({
        message:"Stacks retrieved successfully",
        stack
        })
  } catch (error) {
    res.status(500).send({
        message:"Error retrieving stack",
        error
        })
    
  }
}
module.exports = {createStackController,getStackController}