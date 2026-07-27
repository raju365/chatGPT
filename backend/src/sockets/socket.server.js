/*
 * ------------------------------------------------------------
 * File        : socket.server.js
 * Description : Initializes Socket.IO, authenticates users,
 *               handles AI conversations, and manages
 *               long-term memory with Pinecone.
 * Author      : Raju Barman
 * ------------------------------------------------------------
 */

const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");

const userModel = require("../models/user.model");
const messageModel = require("../models/message.model");

const aiService = require("../service/ai.service");
const { createMemory, queryMemory } = require("../service/vector.service");

/*
 * Initialize Socket.IO server.
 * @param {import("http").Server} httpServer
 */
function initSocketServer(httpServer) {
  // Create Socket.IO server
  const io = new Server(httpServer, {
    cors: {
      origin: ["http://localhost:5173", "https://your-frontend.vercel.app"],
      credentials: true,
    },
  });

  // Authenticate every socket connection
  io.use(async (socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers?.cookie || "");

    if (!cookies.token) {
      return next(new Error("Authentication error: no token provided"));
    }

    try {
      const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);

      const user = await userModel.findById(decoded.id);

      if (!user) {
        return next(new Error("User not found"));
      }

      socket.user = user;

      next();
    } catch (error) {
      console.error(error);

      next(new Error("Authentication error: invalid token"));
    }
  });

  // Handle client connection
  io.on("connection", (socket) => {
    console.log(`✅ User connected : ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`❌ User disconnected : ${socket.id}`);
    });

    /**
     * AI Conversation Flow
     * 1. Save user message
     * 2. Generate embedding
     * 3. Store memory in Pinecone
     * 4. Retrieve STM + LTM
     * 5. Generate AI response
     * 6. Send response
     * 7. Save AI response
     * 8. Store AI response in Pinecone
     */
    socket.on("ai-message", async (messagePayload) => {
      try {
        console.log("Received ai-message:", messagePayload);

        // Save message and generate embedding
        const [message, vectors] = await Promise.all([
          messageModel.create({
            chat: messagePayload.chat,
            user: socket.user._id,
            content: messagePayload.content,
            role: "user",
          }),
          aiService.generateVector(messagePayload.content),
        ]);

        await createMemory({
          vectors,
          messageId: message._id,
          metadata: {
            chat: messagePayload.chat.toString(),
            user: socket.user._id.toString(),
            text: messagePayload.content,
          },
        });

        // Retrieve long-term memory and recent chat history
        const [memory, chatHistory] = await Promise.all([
          queryMemory({
            queryVector: vectors,
            limit: 3,
            metadata: {
              user: {
                $eq: socket.user._id.toString(),
              },
            },
          }),
          messageModel
            .find({
              chat: messagePayload.chat,
            })
            .sort({ createdAt: -1 })
            .limit(20)
            .lean()
            .then((messages) => messages.reverse()),
        ]);

        // Build short-term memory (STM)
        const stm = chatHistory.map((item) => ({
          role: item.role,
          parts: [{ text: item.content }],
        }));

        // Build long-term memory (LTM)
        const ltm = [
          {
            role: "user",
            parts: [
              {
                text: `
these are some previous messages from the chat, use them to generate a response

${(memory || [])
  .map((item) => item.metadata.text)
  .filter(Boolean)
  .join("\n")}
                `,
              },
            ],
          },
        ];

        // Generate AI response
        const response = await aiService.generateResponse([...ltm, ...stm]);

        // Send response immediately
        socket.emit("ai-response", {
          content: response,
          chat: messagePayload.chat,
        });

        // Save AI response and embedding
        const [responseMessage, responseVector] = await Promise.all([
          messageModel.create({
            chat: messagePayload.chat,
            user: socket.user._id,
            content: response,
            role: "model",
          }),
          aiService.generateVector(response),
        ]);

        await createMemory({
          vectors: responseVector,
          messageId: responseMessage._id,
          metadata: {
            chat: messagePayload.chat.toString(),
            user: socket.user._id.toString(),
            text: response,
          },
        });
      } catch (error) {
        console.error("AI Error:", error.message);

        // Notify client about failure
        socket.emit("ai-error", {
          message: "Failed to generate AI response",
        });
      }
    });
  });
}

module.exports = initSocketServer;
