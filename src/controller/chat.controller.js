/*
 * -------------------------------------------------------
 * File : chat.controller.js
 * Description : Handles chat related operations
 *               (Create New Chat)
 * Author : Raju Barman
 * -------------------------------------------------------
 */
const chatModel = require("../models/chat.model");
/*
 * Create a new chat for the authenticated user
 */
async function createChat(req, res) {
  try {
    // Extract chat title from request body
    const { title } = req.body;
     // Validate title
    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Title is required",
      });
    }
     // Get authenticated user from auth middleware
    const user = req.user;
    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
 // Create a new chat
    const chat = await chatModel.create({
      user: user._id,
      title:title.trim(),
    });
     // Send success response
    return res.status(201).json({
      message: "Chat created successfully",
      chat: {
        id: chat._id,
        title: chat.title,
        user: chat.user,
        lastActivity: chat.lastActivity,
      },
    });
  } catch (error) {
     // Log server error
    console.error("Error creating chat:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
module.exports = { createChat };
