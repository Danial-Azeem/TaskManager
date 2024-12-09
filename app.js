import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import connectDB from "./conn/connDB.js";

const app = express();
app.use(express.json());
dotenv.config();
const port = process.env.PORT;
connectDB();

app.use("/api/v1", userRoutes);
app.use("/api/v1/", taskRoutes);
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
