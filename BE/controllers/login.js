import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const accessToken = generateAccessToken({ email: user.email });
  const refreshToken = generateRefreshToken({ email: user.email });

  res.cookie('accessToken', accessToken, {
    httpOnly: true,    // Prevents JavaScript access
    secure: true, // Set to true if using HTTPS
    sameSite: 'Strict', // Can be 'Lax' or 'None' based on your needs
    maxAge: 15 * 60 * 1000, // Token expiration time (15 minutes)
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true, 
    sameSite: 'Strict', 
    maxAge: 30 * 24 * 60 * 60 * 1000, 
  });

  // res.json({ message: 'Login successful' });
  res.json({login: true})
};

export default login;






  // res.send("Hello from login route")
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