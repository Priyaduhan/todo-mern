import express from "express";
import {
  loginTodo,
  saveSignupFormInDB,
} from "../controllers/userController.js";
const router = express.Router();

router.post("/", saveSignupFormInDB);

router.post("/login", loginTodo);

// router.get("/home", authenticateToken, fetchData);

export default router;
