const { app, connectDb } = require("./app");

let isConnected = false;

module.exports = async (req, res) => {
  try {
    if (!isConnected) {
      await connectDb();
      isConnected = true;
      console.log("✅ DB connected on Vercel");
    }

    return app(req, res);

  } catch (error) {
    console.error("❌ Vercel Function Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server crashed",
      error: error.message,
    });
  }
};