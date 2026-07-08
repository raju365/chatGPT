const chatModel = require("../models/chat.model");

async function createChat(req, res) {
  try {
    const { title } = req.body;
    
    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Title is required",
      });
    }
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const chat = await chatModel.create({
      user: user._id,
      title:title.trim(),
    });
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
    console.error("Error creating chat:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
module.exports = { createChat };
