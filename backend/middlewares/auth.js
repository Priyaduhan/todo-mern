import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

export const authenticateToken = (req, res,next) => {
//   console.log(req);
  const auth = req.cookies.jwtoken;
  if (!auth) {
    return res.status(400).json({ msg: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("req dot user is ", req.user);

    next();
  } catch (error) {
    res.status(400).json({ message: "Token is not valid" });
  }
};
