import express from "express";
import { MessageController } from "../../../controllers/message/messageController";

const message = new MessageController();
const router = express.Router();

// POSTリクエストが送られてきた際の処理
router.post('/repeat', (req, res) => {
  message.replyRepeatMessage(req,res);
})

module.exports = router
