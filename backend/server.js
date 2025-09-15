import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/db.js";
import todoRoutes from "./routes/todoRoutes.js";
import userRoutes from "./routes/userDataRoutes.js";
import cookieParser from "cookie-parser";

import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173", // local dev frontend
  "https://todo-mern-gray.vercel.app/login", // deployed frontend
];

dotenv.config({
  path: "./env",
});
const PORT = process.env.PORT || 9000;

const app = express();
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    credentials: true,
  })
);
app.options(
  "*",
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

//db connect
connectDB();

app.use("/api", todoRoutes);

app.use("/api/userData", userRoutes);

app.listen(PORT, () => {
  console.log("server listening on port 9000");
});
