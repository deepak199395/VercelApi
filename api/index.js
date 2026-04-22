const connectDb = require("../Config/Db");
const app = require("../app");

let isConnected = false;

module.exports = async (req, res) => {
  if (!isConnected) {
    await connectDb();
    isConnected = true;
    console.log("DB connected on Vercel");
  }
  return app(req, res);
};