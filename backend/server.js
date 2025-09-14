import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/db.js";
import todoRoutes from "./routes/todoRoutes.js";
import userRoutes from "./routes/userDataRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config({
  path: "./env",
});

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

//db connect
connectDB();

app.use("/api", todoRoutes);

app.use("/api/userData", userRoutes);

app.listen(9000, () => {
  console.log("server listening on port 9000");
});
