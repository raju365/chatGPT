const useModel = require("../models/user.model");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
async function registerUser(req, res) {
  const {
    fullName: { firstName, lastName },
    email,
    password,
  } = req.body;

  const isUserAlreadyExist = await userModel.findOne({ email });
  if (isUserAlreadyExist) {
    res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = await bycrypt.hash(password, 10);
  const user = new userModel.create({
    fullName: { firstName, lastName },
    email,
    password: hashedPassword,
  });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token);


  res.status(201).json({ message: "User registered successfully" ,
    user:{
        email:user.email,
        fullName:user.fullName,
        id:user._id
    }
  });
}

module.exports = { registerUser };
