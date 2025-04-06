const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const authJwt = require("../middleware/authJwt");

// Get logged-in user
router.get("/", [authJwt.verifyToken], chatController.getLoggedInUser);

// Get all chat messages
router.get("/messages", chatController.getAllMessages);

// Send a new message
router.post("/send", chatController.sendMessage);
module.exports = router;
