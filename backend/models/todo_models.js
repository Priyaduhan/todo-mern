import mongoose from "mongoose";
import { usermodel } from "./user_models.js";

const todoSchema = new mongoose.Schema({
  //   id: {
  //     type: String,
  //   },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "usermodel", // Reference to the User model
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

export const todoModel = mongoose.model("todomodel", todoSchema);
