const { createServer } = require("http");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

// Создание приложения Next.js
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer, {
    path: '/api/socket',
  });
  const userMapping = {};

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("registerUser", (username) => {
      userMapping[socket.id] = username; // Store the mapping of socket ID to username
  });

  socket.on("mouseMove", (data) => {
      const username = userMapping[data.userId] || 'Unknown'; // Get the username from the mapping
      socket.broadcast.emit("mouseMove", { ...data, username }); // Emit with the username
  });

  socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
      delete userMapping[socket.id]; // Clean up on disconnect
  });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});