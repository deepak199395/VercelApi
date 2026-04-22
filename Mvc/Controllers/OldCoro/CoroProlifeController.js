const Profilemodel= require("../../MongoModels/Old/CoroPfofileModel")

const profileController=async(req,res)=>{
    try {
    const {firstName,lastName,email,dob,occupation,workExperience,salary,currentfirm,address}=req.body
    const newProfile=   await Profilemodel.create({
        firstName,
        lastName,
        email,
        dob,
        occupation,
        workExperience,
        salary,
        currentfirm,
        address
      
    })
    res.status(201).send({
        success:true,
        message:"Profile Created Successfully",
        newProfile
    })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error Creating Profile",
            error
            })
         }
}
const getProfileDetailsController=async(req,res)=>{
   try {
      const ProfileDetails= await Profilemodel.find()
      res.status(200).send({
        success:true,
        message:"Profile Details Fetched Successfully",
        ProfileDetails
        })

   } catch (error) {
    res.status(500).send({
        success:false,
        message:"Error Fetching Profile Details",
        error
        })
    
   }
}


module.exports={profileController,getProfileDetailsController};  