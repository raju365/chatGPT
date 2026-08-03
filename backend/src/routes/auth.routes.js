const express = require("express");
const authControllers = require("../controller/auth.controller");
const { authUser } = require("../middleware/auth.middleware");

const router = express.Router();

/*
 * POST /api/auth/register
 */
router.post("/register", authControllers.registerUser);

/*
 * POST /api/auth/login
 */
router.post("/login", authControllers.loginUser);

/*
 * POST /api/auth/logout
 */
router.post("/logout", authUser, authControllers.logoutUser);

/*
 * GET /api/auth/me
 */
router.get("/me", authUser, authControllers.getMe);

/*
 * POST /api/auth/forgot-password
 */
router.post("/forgot-password", authControllers.forgotPassword);

/*
 * POST /api/auth/reset-password/:token
 */
router.post("/reset-password/:token", authControllers.resetPassword);

/*
 * PATCH /api/auth/profile
 */
router.patch("/profile", authUser, authControllers.updateProfile);

/*
 * PATCH /api/auth/change-password
 */
router.patch("/change-password", authUser, authControllers.changePassword);

router.delete(
  "/delete-account",
  authUser,
  authControllers.deleteAccount,
);
module.exports = router;
