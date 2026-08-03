const express = require("express");
const authControllers = require("../controller/auth.controller");
const { authUser } = require("../middleware/auth.middleware");

// Create Express Router
const router = express.Router();
/*
 * POST /api/auth/register
 * Register a new user
 */
router.post("/register", authControllers.registerUser);
/*
 * POST /api/auth/login
 * Login existing user
 */
router.post("/login", authControllers.loginUser);

/*
 * POST /api/auth/logout
 * Logout current user
 */
router.post("/logout", authUser, authControllers.logoutUser);

router.get("/me", authUser, authControllers.getMe);
router.post("/forgot-password", authController.forgotPassword);

module.exports = router;
