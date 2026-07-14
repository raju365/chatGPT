const mongoose = require("mongoose");
/*
 * Message Schema
 * Each document represents one message in a chat.
 */
const messageSchema = new mongoose.Schema(
  {
    // Reference to the user who sent this message
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    // Reference to the chat this message belongs to
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chat",
    },
    // Actual message content
    // Can be user input or AI generated response
    content: {
      type: String,
      required: true,
    },
    // Specifies who generated the message
    // user   -> Human user
    // model  -> AI response
    // system -> Internal system instructions
    role: {
      type: String,
      enum: ["user", "model", "system"],
      default: "user",
    },
  },
  // Automatically adds:
  // createdAt
  // updatedAt
  {
    timestamps: true,
  },
);
// Create Message Model
const MessageModel = mongoose.model("message", messageSchema);
module.exports = MessageModel;
