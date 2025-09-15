import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/db.js";
import todoRoutes from "./routes/todoRoutes.js";
import userRoutes from "./routes/userDataRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config({
  path: "./env",
});

const PORT = process.env.PORT || 9000;

const allowedOrigins = [
  "http://localhost:5173", // local dev frontend
  "https://todo-mern-gray.vercel.app", // deployed frontend
];

const app = express();

// ✅ Setup CORS (handles preflight automatically)
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// ✅ connect DB
connectDB();

// ✅ routes
app.use("/api", todoRoutes);
app.use("/api/userData", userRoutes);

// ✅ start server
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
