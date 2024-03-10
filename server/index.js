import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userRoutes.js"
import shiftRoute from "./routes/shiftRoutes.js"
import path from "path";

dotenv.config();
const __dirname = path.resolve();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("MongoDb is connected");
});

app.use("/api/user", userRoute);
app.use("/api/shift", shiftRoute);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});