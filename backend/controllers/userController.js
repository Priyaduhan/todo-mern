import { usermodel } from "../models/user_models.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const generateToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const saveSignupFormInDB = async (req, res) => {
  try {
    // console.log(req);
    const formData = req.body;
    const savedUser = await usermodel.create(formData);
    console.log(savedUser);

    res.json({ msg: "form sucess" });
  } catch (error) {}
};

export const loginTodo = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body);

    let UserCredentials = await usermodel.findOne({ email: email });
    if (!UserCredentials) {
      return res.status(400).json({ msg: "User does not exist" });
    }
    if (UserCredentials.password == password) {
      const token = generateToken(UserCredentials._id, UserCredentials.email);

      res.cookie("jwtoken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // or "none" if cross-origin
        path: "/",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      return res.json({ msg: "success", accessToken: token });
    } else {
      return res.json({ msg: "Password is incorrect" });
    }
  } catch (error) {
    console.log("error in backend login is", error);
  }
};

// export const fetchData = async (req, res) => {
//   try {
//     console.log("req from home route", req);
//   } catch (error) {
//     console.log("some error in home route backend", error);
//   }
// };
