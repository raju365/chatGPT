/*
 * -------------------------------------------------------
 * File : auth.controller.js
 * Description : Handles user authentication
 *               (Register & Login)
 * Author : Raju Barman
 * -------------------------------------------------------
 */
const userModel = require("../models/user.model");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/*
 * Register a new user
 */
async function registerUser(req, res) {
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  // Extract user details from request body
  const {
    fullName: { firstName, lastName },
    email,
    password,
  } = req.body;
// Check if user already exists
  const isUserAlreadyExist = await userModel.findOne({ email });

  if (isUserAlreadyExist) {
    return res.status(400).json({ message: "User already exists" });
  }
  // Hash password before saving
  const hashedPassword = await bycrypt.hash(password, 10);
  // Create new user
  const user = await userModel.create({
    fullName: { firstName, lastName },
    email,
    password: hashedPassword,
  });
  // Generate JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
   // Store token inside HTTP only cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
 // Send success response
  res.status(201).json({
    message: "User registered successfully",
    user: {
      email: user.email,
      fullName: user.fullName,
      id: user._id,
    },
  });
}
/*
 * Login existing user
 */
async function loginUser(req, res) {
   // Extract login credentials
  const { email, password } = req.body;
   // Find user using email
  const user = await userModel.findOne({ email });
  // User not found
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
   // Compare entered password with hashed password
  const isPasswordValid = await bycrypt.compare(password, user.password);
   // Password mismatch
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
   // Generate JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  // Store token in HTTP only cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  // Send login success response
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
