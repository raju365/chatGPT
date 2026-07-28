/*
 * -------------------------------------------------------
 * File : chat.routes.js
 * Description : Chat related routes
 *               (Create Chat)
 * Author : Raju Barman
 * -------------------------------------------------------
 */

const express = require("express");

const authMiddleware = require("../middleware/auth.middleware");
const chatController = require("../controller/chat.controller");

// Create Express Router
const router = express.Router();

/*
 * -------------------------------------------------------
 * POST /api/chat/
 * Description : Create a new chat
 * Access      : Private (Authenticated User)
 * -------------------------------------------------------
 */
router.post("/", authMiddleware.authUser, chatController.createChat);
router.get("/", authMiddleware.authUser, chatController.getUserChats);
module.exports = router;
