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
      title: title.trim(),
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
async function getUserChats(req, res) {
  try {
    const chats = await chatModel
      .find({ user: req.user._id })
      .sort({ lastActivity: -1 });

    return res.status(200).json({
      chats,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch chats",
    });
  }
}
module.exports = { createChat, getUserChats };
