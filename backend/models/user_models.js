import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minLength: [3, "Username must be at least 3 characters long"],
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minLength: [3, "lastName must be at least 3 characters long"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^.+@.+\..+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
});
export const usermodel = mongoose.model("usermodel", UserSchema);
