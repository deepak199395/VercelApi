const { hashPassword, comparePassword } = require("../../../Helper/utils/hash");
const userModel = require("../../MongoModels/Old/UserSchem");
const jwt = require('jsonwebtoken');
const JWT_SECRET=process.env.JWT_SECRET || "myVerySecretKey123";

// get userController
const createUserController = async (req, res) => {
    try {
        const { name, lastname, email, password, phone, role } = req.body;
        // validations
        if (!name || !lastname || !email || !password || !phone) {
            return res.status(400).send({
                message: "Please fill all the fields"
            });
        }
        // cheack existing user
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: "User already exists"
            })
        }
        const hashedPassword = await hashPassword(password)
        // create userr
        const user = await userModel.create({ name, lastname, email, password:hashedPassword, phone })
        res.status(201).send({
            success: true,
            message: "User created successfully",
            user
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error creating user",
            error
       })
    }
}
// post userController
const getUserController = async (req, res) => {
    try {
        const users = await userModel.find()
        res.status(200).send({
            success: true,
            message: "Users retrieved successfully",
            users
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error retrieving users",
            error
        })
    }
}
// Login  editcontroller
const LoginController = async (req, res) => {
    try {
        const { email, password } = req.body
        // validation
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Email and password are required"
            })
        }
        // find user
        const user = await userModel.findOne({ email: email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "incorrect Creadition",
            })
        }
        const isMatch= await comparePassword(password,user.password);
        if(!isMatch){
            return res.status(401).send({
                success: false,
                message: "Incorrect credentials",
            })
        }
      // Generate JWT token
      const token =jwt.sign(
        {id:user._id,email:user.email,role:user.role },
        JWT_SECRET,
        {expiresIn:"1d"}
      );
    // Save user info and token inside session
      req.session.user={
            id: user._id,
            email: user.email,
            role: user.role,
        };
        req.session.token = token;

        res.status(201).send({
            success: true,
            massage: "User login successfully",
            user:req.session.user,
            token
        });
    } catch (error) {
        console.log("error while login", error)
        res.status(500).send({
            success: false,
            message: "Error while login",
            error:error.message
        });
    }
};
const updateUserController = async (req, res) => {
    try {
        const { id } = req.params
        const { name, lastname, email, password, phone, role } = req.body
        let updatedData = { name, lastname, email, password, phone, role };
        const updatedUser = await userModel.findByIdAndUpdate(id, updatedData, { new: true })
        if (!updatedUser) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).send({
            success: true,
            message: "User updated successfully",
            updatedUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Error updating user", error });
    }
}
const deleteController = async (req, res) => {
    try {
        const { id } = req.params
        const deleteUser = await userModel.findByIdAndDelete(id)
        if (!deleteUser) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            })
        }
        res.status(200).send({
            success: true,
            message: "User deleted successfully"
        })

    } catch (error) {
        console.log("error delete user api", error)
        res.status(500).send({
            success: false,
            message: "Error deleting user",
            error
        })

    }

}
module.exports = {
    createUserController,
    getUserController,
    LoginController,
    updateUserController,
    deleteController
}