import mongoose from "mongoose";
import dotenv from "dotenv";
import { logger } from "../log/logger";

dotenv.config();

const connectDB = async () => {
  //const uri = process.env.MONGODB_URL;
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    logger.info("MongoDB Connected");
  } catch (error) {
    logger.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

export default connectDB;
