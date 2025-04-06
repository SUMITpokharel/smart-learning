const express = require("express");
const cors = require("cors");
const http = require("http"); // Required for socket.io
const { Server } = require("socket.io");
const path = require("path");
const cookieParser = require("cookie-parser");

const categoryRoute = require("./routes/categoryRoute");
const taskRoute = require("./routes/taskRoute");
const userRoute = require("./routes/userRoute");
const noteRoute = require("./routes/notesRoute");
const reminderRoute = require("./routes/reminderRoute");
const teacherRoute = require("./routes/teacherRoute");
const helperRoute = require("./routes/helperRoute");
const shareFileRoute = require("./routes/shareFileRoute");
const chatRoute = require("./routes/chatRoutes"); // Chat Routes

// Initialize Express App
const app = express();
const server = http.createServer(app); // Creating an HTTP server for socket.io

// Database Connection (Sequelize)
const db = require("./model/index");
require("dotenv").config();
db.sequelize.sync({ force: false });

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "uploads")));

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:3001",
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Seeding initial Database with Admin
const ADMIN_SEEDER = require("./seeder");
app.use(ADMIN_SEEDER);

// API Routes
app.use("/api/category", categoryRoute);
app.use("/api/task", taskRoute);
app.use("/api/user", userRoute);
app.use("/api/notes", noteRoute);
app.use("/api/reminder", reminderRoute);
app.use("/api/teacher", teacherRoute);
app.use("/api/helper", helperRoute);
app.use("/api/shareFile", shareFileRoute);
app.use("/api/chat", chatRoute); // Add chat routes

// Setup Socket.io
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Load chat history
  socket.on("loadMessages", async () => {
    try {
      const messages = await db.Chat.findAll({
        include: [{ model: db.Users, attributes: ["id", "name", "image"] }],
        order: [["timestamp", "ASC"]],
      });
      socket.emit("chatHistory", messages);
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  });

  // Handle new messages
  socket.on("sendMessage", async (data) => {
    const { userId, message } = data;

    if (!userId || !message.trim()) {
      console.error("Invalid message data:", data);
      return;
    }

    try {
      const newMessage = await db.Chat.create({ userId, message });
      const fullMessage = await db.Chat.findOne({
        where: { id: newMessage.id },
        include: [{ model: db.Users, attributes: ["id", "name", "image"] }],
      });
      io.emit("receiveMessage", fullMessage); // Broadcast to all users
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
