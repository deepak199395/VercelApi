const mongoose = require("mongoose");
const colors = require("colors")
const connectDb= async()=>{
    try {
         await mongoose.connect(process.env.MONGO_URL)
         console.log(`Successfully conection stablist with Data ${mongoose.connection.host}`.bgGreen.bgMagenta)
    } catch (error) {
        console.log("error in Database connections ",error)
    }

}
module.exports  = connectDb;