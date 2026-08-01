/*
 * -------------------------------------------------------
 * File : chat.controller.js
 * Description : Handles chat related operations
 *               (Create New Chat)
 * Author : Raju Barman
 * -------------------------------------------------------
 */
const chatModel = require("../models/chat.model");
const messageModel = require("../models/message.model");
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
        _id: chat._id,
        title: chat.title,
        user: chat.user,
        lastActivity: chat.lastActivity,
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt,
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
async function getChatMessages(req, res) {
  try {
    const { chatId } = req.params;
    const chat = await chatModel.findById(chatId);

    if (!chat) {
      return res.status(404).json({
        message: "Chat not found",
      });
    }

    if (chat.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Access denied",
      });
    }
    const messages = await messageModel
      .find({ chat: chatId })
      .sort({ createdAt: 1 });

    return res.status(200).json({
      messages,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch messages",
    });
  }
}
async function renameChat(req, res) {
  try {
    const { chatId } = req.params;
    const { title } = req.body;

    // Validate title
    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    // Check if chat exists
    const chat = await chatModel.findById(chatId);

    if (!chat) {
      return res.status(404).json({
        message: "Chat not found",
      });
    }

    // Check ownership
    if (chat.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    // Update title
    chat.title = title.trim();

    await chat.save();

    return res.status(200).json({
      message: "Chat renamed successfully",
      chat,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to rename chat",
    });
  }
}
async function deleteChat(req, res) {
  try {
    const { chatId } = req.params;

    const chat = await chatModel.findById(chatId);

    if (!chat) {
      return res.status(404).json({
        message: "Chat not found",
      });
    }

    if (chat.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    // delete messages

    await messageModel.deleteMany({
      chat: chatId,
    });

    // delete chat

    await chat.deleteOne();

    return res.status(200).json({
      message: "Chat deleted successfully",
      chatId,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to delete chat",
    });
  }
}
module.exports = { createChat, getUserChats, getChatMessages, renameChat, deleteChat };
