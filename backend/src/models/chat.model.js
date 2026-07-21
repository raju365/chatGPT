const mongoose = require("mongoose");

/*
 * Chat Schema
 * Represents a single chat session created by a user.
 */
const chatSchema = new mongoose.Schema(
  {
    // Reference to the user who owns this chat
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Chat title displayed in the sidebar
    title: {
      type: String,
      required: true,
      trim: true,
    },
    // Stores the timestamp of the latest activity
    // Used for sorting chats (Most Recent First)
    lastActivity: {
      type: Date,
      default: Date.now,
    },
  },
  // Automatically adds:
  // createdAt
  // updatedAt
  {
    timestamps: true,
  },
);
// Create Chat Model
const chatModel = mongoose.model("chat", chatSchema);

module.exports = chatModel;
