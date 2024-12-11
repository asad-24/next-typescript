import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = { isConnected: 0 };

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to the database");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URL || "", {});
    connection.isConnected = mongoose.connection.readyState;
    console.log("DB connected successfully");
  } catch (err) {
    console.error("Database connection failed:", err);
    throw new Error("Failed to connect to the database");
  }
}

export default dbConnect;
