const mongoose = require("mongoose");
/*
 * User Schema
 * Represents a registered user in the application.
 */
const userSchema = new mongoose.Schema(
  {
    // User email address
    // Must be unique for every account
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // User's full name
    fullName: {
      // First name
      firstName: {
        type: String,
        required: true,
      },
      // Last name
      lastName: {
        type: String,
        required: true,
      },
    },
    // Encrypted password
    // Password is hashed before storing in the database
    password: {
      type: String,
      required: true,
      select: false, // Exclude password from query results by default
    },
    resetPasswordToken: {
      type: String,
    },

    resetPasswordExpire: {
      type: Date,
    },
  },
  // Automatically adds:
  // createdAt
  // updatedAt
  {
    timestamps: true,
  },
);
// Create User Model
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
