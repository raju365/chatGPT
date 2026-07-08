const userModel = require("../models/user.model");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
async function registerUser(req, res) {
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  const {
    fullName: { firstName, lastName },
    email,
    password,
  } = req.body;

  const isUserAlreadyExist = await userModel.findOne({ email });
  if (isUserAlreadyExist) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = await bycrypt.hash(password, 10);
  const user = await userModel.create({
    fullName: { firstName, lastName },
    email,
    password: hashedPassword,
  });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.status(201).json({
    message: "User registered successfully",
    user: {
      email: user.email,
      fullName: user.fullName,
      id: user._id,
    },
  });
}
async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const isPasswordValid = await bycrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({
    message: "User logged in successfully",
    user: {
      email: user.email,
      fullName: user.fullName,
      id: user._id,
    },
  });
}
module.exports = { registerUser, loginUser };
