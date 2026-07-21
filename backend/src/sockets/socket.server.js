const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const aiService = require("../service/ai.service");
const messageModel = require("../models/message.model");
const { createMemory, queryMemory } = require("../service/vector.service");

function initSocketServer(httpServer) {
  // Initialize Socket.IO server with HTTP server
  const io = new Server(httpServer, {});
  // Middleware: Authenticate user before socket connection
  io.use(async (socket, next) => {
    // Parse cookies from socket handshake request
    const cookies = cookie.parse(socket.handshake.headers?.cookie || "");

    // Check if JWT token exists
    if (!cookies.token) {
      return next(new Error("Authentication error: no token provided"));
    }

    try {
      // Verify JWT token
      const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);

      // Find user from database
      const user = await userModel.findById(decoded.id);

      // Attach authenticated user to socket object
      socket.user = user;
      // Allow socket connection
      next();
    } catch (error) {
      console.log(error);
      // Invalid or expired token
      next(new Error("Authentication error: invalid token"));
    }
  });
  // Fired whenever a new socket connection is established
  io.on("connection", (socket) => {
    // Listen for user message event
    socket.on("ai-message", async (messagePayload) => {
      try {
        console.log("Received ai-message:", messagePayload);

        // Save user's message into database
        const message = await messageModel.create({
          chat: messagePayload.chat,
          user: socket.user._id,
          content: messagePayload.content,
          role: "user",
        });

        const vectors = await aiService.generateVector(messagePayload.content);

        const memory = await queryMemory({
          queryVector: vectors,
          limit: 3,
          metadata: {},
        });
        
        await createMemory({
          vectors,
          messageId: message._id,
          metadata: {
            chat: messagePayload.chat,
            user: socket.user._id,
            text: messagePayload.content,
          },
        });

        console.log(memory);

        // Fetch previous chat history
        // Sort -> Oldest to Newest
        // Limit -> Last 20 messages
        // Lean -> Return plain JavaScript objects
        // Reverse -> Reverse array order
        const chatHistory = await messageModel
          .find({
            chat: messagePayload.chat,
          })
          .sort({ createdAt: 1 })
          .limit(20)
          .lean();
        chatHistory.reverse();

        // Convert database messages into Gemini compatible format
        const response = await aiService.generateResponse(
          chatHistory.map((item) => ({
            role: item.role,
            parts: [
              {
                text: item.content,
              },
            ],
          })),
        );

        // Save AI response into database
        const responseMessage = await messageModel.create({
          chat: messagePayload.chat,
          user: socket.user._id,
          content: response,
          role: "model",
        });

        // Save AI response into vector database
        const responseVector = await aiService.generateVector(response);
        await createMemory({
          vectors: responseVector,
          messageId: responseMessage._id,
          metadata: {
            chat: messagePayload.chat,
            user: socket.user._id,
            text: response,
          },
        });

        // Send AI response back to frontend
        socket.emit("ai-response", {
          content: response,
          chat: messagePayload.chat,
        });
      } catch (error) {
        console.error("Error generating AI response:", error.message);
        // Notify frontend about AI failure
        socket.emit("ai-error", {
          message: "Failed to generate AI response",
        });
      }
    });
  });
}

module.exports = initSocketServer;
