const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDb = async () => {
  try {
    if (cached.conn) {
      return cached.conn;
    }

    if (!cached.promise) {
      cached.promise = mongoose.connect(MONGO_URL, {
        bufferCommands: false,
      }).then((mongoose) => {
        console.log("MongoDB Connected:", mongoose.connection.host);
        return mongoose;
      });
    }

    cached.conn = await cached.promise;
    return cached.conn;

  } catch (error) {
    console.error("DB connection error:", error);
    throw error;
  }
};

module.exports = connectDb;