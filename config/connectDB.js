import mongoose from "mongoose";

const connectDB = async (DB_URI) => {
  try {
    const OPTIONS = { dbName: "express-auth-jwt" };

    await mongoose.connect(DB_URI, OPTIONS);
    console.log("DB Connected");
  } catch (error) {
    console.log("Error while connecting to mongoDB => ", error);
  }
};
export default connectDB;
