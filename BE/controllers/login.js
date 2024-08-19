import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const login = async (req, res) => {

res.send("Hello from login route")
  // const { email, password } = req.body;

  // if (!email || !password) {
  //   throw new Error("Error login");
  // }

  // const user = await User.findOne({ email });
  // if (!user) {
  //   throw new Error("Invalid Credentials");
  // }

  // const isPasswordCorrect = await bcrypt.compare(password, user.password);
  // if (!isPasswordCorrect) {
  //   throw new Error("Invalid Credentials");
  // }

  // const token = jwt.sign(
  //   { id: user._id, email: user.email },
  //   process.env.JWT_SECRET,
  //   { expiresIn: "30d" }
  // );

  // res.status(200).json({ msg: "Login successful", token });
};

export default login;
