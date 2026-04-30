const { app, connectDb } = require("./app");

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    await connectDb();
    console.log("✅ MongoDB Connected Successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ DB Connection Failed:", error);
    process.exit(1);
  }
};

startServer();