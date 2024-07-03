const express = require("express");
const { sendMessage, saveConversation, getConversation } = require("../controllers/chatController");
const router = express.Router();

router.post("/", sendMessage);
router.post("/threadId", saveConversation);
router.get("/threadId", getConversation);

module.exports = router;
