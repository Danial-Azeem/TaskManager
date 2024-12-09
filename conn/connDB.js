import mongoose from "mongoose";

const connectDB = async () => {
  const conn_url = process.env.DATABASE_CONNECTION_URL;
  try {
    if (!conn_url) {
      console.log("Failed to connect with the database.");
    }
    await mongoose
      .connect(conn_url)
      .then(console.log("Database is connected successfully"));
  } catch (error) {
    console.error("Failed to connect to the database:", error.message);
    process.exit(1);
  }
};

export default connectDB;
