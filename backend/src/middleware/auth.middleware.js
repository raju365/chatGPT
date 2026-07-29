const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

/*
 * Authenticate user before accessing protected routes
 */
async function authUser(req, res, next) {
  // Get JWT token from cookies
  const { token } = req.cookies;
  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Fetch authenticated user
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // Attach user object to request
    req.user = user;
    // Continue to next middleware/controller
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err.message);
    // Invalid or expired token
    return res.status(401).json({ message: "Unauthorized" });
  }
}
module.exports = { authUser };
