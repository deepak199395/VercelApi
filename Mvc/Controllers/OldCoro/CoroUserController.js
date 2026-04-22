const CoroRegiModel = require("../../MongoModels/Old/CoroRegiModel")
const { hashPassword, comparePassword } = require("../../../Helper/utils/hash");
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "myVerySecretKey123";
const CreateCoroUser = async (req, res) => {
    try {
        const { name, email, phone, password, gender, age, address } = req.body;
        // validation
        if (!name || !email || !phone || !password || !gender
            || !age || !address) {
            return res.status(400).json({ message: "Please fill all the fields" })
        }
        // cheack existing user
        const existingUser = await CoroRegiModel.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" })
        }
        const hashedPassword = await hashPassword(password)
        // create userr
        const cororegi = await CoroRegiModel.create({ name, email, phone, password: hashedPassword, gender, age, address })
        //validations
        res.status(201).send({
            flage: "Y",
            message: "User created successfully",
            data: cororegi
        })
    } catch (error) {
        res.status(500).send({
            flage: "N",
            message: "Error in creating user",
            data: error
        })
    }
}
// get corouser 
const CorouserregiGet = async (req, res) => {
    try {
        const corouser = await CoroRegiModel.find()
        res.status(200).send({
            flage: "Y",
            message: "User list",
            data: corouser
        })
    } catch (error) {
        res.status(500).send({
            flage: "N",
            message: "Error in getting user list",
            data: error
        })
    }
}
// get corouser by id
const CorouserregiGetById = async (req, res) => {
    try {
        const corouser = await CoroRegiModel.findById(req.params.id)
        if (!corouser) {
            res.status(404).json({ message: "User not found" })
        } else {
            res.status(200).send({
                flage: "Y",
                message: "User found",
                data: corouser
            })
        }
    } catch (error) {
        res.status(500).send({
            flage: "N",
            message: "Error in getting user by id",
            data: error
        })
    }
}
// update corouser
const CorouserregiUpdate = async (req, res) => {
    try {
        const corouser = await CoroRegiModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        if (!corouser) {
            res.status(404).json({ message: "User not found" })
        } else {
            res.status(200).send({
                flage: "Y",
                message: "User updated",
                data: corouser
            })
        }
    } catch (error) {
        res.status(500).send({
            flage: "N",
            message: "Error in updating user",
            data: error
        })
    }
}
// delete corouser
const CorouserregiDelete = async (req, res) => {
    try {
        const corouser = await CoroRegiModel.findByIdAndDelete(req.params.id)
        if (!corouser) {
            res.status(404).json({ message: "User not found" })
        } else {
            res.status(200).send({
                flage: "Y",
                message: "User deleted",
                data: corouser
            })
        }
    } catch (error) {
        res.status(500).send({
            flage: "N",
            message: "Error in deleting user",
            data: error
        })
    }
}
// LOGIN

const coroLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                flage: "N",
                message: "Email and password are required"
            });
        }

        // Find user
        const CoroUser = await CoroRegiModel.findOne({ email });
        if (!CoroUser) {
            return res.status(404).send({
                success: false,
                flage: "N",
                message: "User not found"
            });
        }

        // Check password
        const isMatch = await comparePassword(password, CoroUser.password);
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                flage: "N",
                message: "Invalid password"
            });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: CoroUser._id, email: CoroUser.email },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        // Save session data
        req.session.CoroUser = {
            id: CoroUser._id,
            email: CoroUser.email
        };
        req.session.token = token;

        // Send response
        res.status(200).send({
            success: true,
            flage: "Y",
            message: "Login successful",
            token: token,
            user: CoroUser

        });

    } catch (error) {
        res.status(500).send({
            success: false,
            flage: "N",
            message: "Internal Server Error",
            error: error.message
        });
    }
};

module.exports = {
    CreateCoroUser,
    CorouserregiGet,
    CorouserregiGetById,
    CorouserregiUpdate,
    CorouserregiDelete,
    coroLoginController
}; 