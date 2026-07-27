require("dotenv").config();

const http = require("http");

const app = require("./src/app");
const connectDb = require("./src/db/db");
const initSocketServer = require("./src/sockets/socket.server");

const PORT = process.env.PORT || 3000;

const httpServer = http.createServer(app);

// Connect to MongoDB
connectDb();

// Initialize Socket.IO
initSocketServer(httpServer);

// Start HTTP server
httpServer.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});