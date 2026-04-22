const { hashPassword, comparePassword } = require('../../../Helper/utils/hash');
const userModel = require('../../MongoModels/foxWeb/CoroAuthRegisterModel');

const CreateRegiUserController = async (req, res) => {
  try {
    const { fullName, email, phone, password, country, city, pincode, profilePhoto, role } = req.body;

    // // Validation
    // if (!fullName || !email || !phone || !password || !country || !city || !pincode || !profilePhoto || !role) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Please fill all the fields",
    //   });
    // }

    // Check for existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists, please login",
      });
    }
        const hashedPassword = await hashPassword(password)

    // Create new user
    const user = await userModel.create({
      fullName,
      email,
      phone,
      password:hashedPassword,
      country,
      city,
      pincode,
      profilePhoto,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error creating user",
      error: error.message,
    });
  }
};

const FoxloginController=async(req,res)=>{
  try {
    const {email,password}=req.body
    if(!email || ! password){
     return res.status(400).send({
        status :false,
        massage:"email and paddword required"
     })
    }
    // find user 
    const user = await userModel.findOne({email:email})
    if(!user){
     return res.status(201).send({
        status:false,
        massage:"invalid Creadition"
      })
    }
    const isMatch = await comparePassword(password,user.password)
    if(!isMatch){
      return res.status(201).send({
        status:false,
        massage:"invalid credential"
      })
    }
    res.status(200).send({
      status:true,
      massage:"User login succssfully"
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status:false,
      massage:"error in api you need cheack in code and servers",
      error
    })
    
  }
}
module.exports = { CreateRegiUserController,FoxloginController };
