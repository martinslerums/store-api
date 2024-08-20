import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
  
  console.log("Request body:", req.body);

  if (req.method !== "POST") {
    return res.status(404).json({ msg: "Not Found eeerrr" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please provide email and password" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

export default register;
