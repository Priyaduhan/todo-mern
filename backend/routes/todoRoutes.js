import express from "express";
import {
  createTodo,
  showTodo,
  deleteTask,
  updateTask,
  updateCompletedTask,
} from "../controllers/todoController.js";
import { authenticateToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", authenticateToken, createTodo);

router.get("/", authenticateToken, showTodo);

router.delete("/:id", deleteTask);

router.patch("/:id", updateTask);

router.patch("/checked/:id", updateCompletedTask);

export default router;
