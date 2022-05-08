import express, { Request, Response } from "express";
import { MessageController } from "../../../controllers/message/messageController";
import { Env } from "../../../../env";

const router = express.Router();

router.post("/repeat", (req, res) => {
  const message = new MessageController(Env.lineRepeatMessageBotClientConfig);
  message.replyRepeatMessage(req, res);
});

router.post("/weather", (req, res) => {
  const message = new MessageController(Env.lineWeatherBotClientConfig);
  message.replyWeatherInfo(req, res);
});

router.post("/itemsearch", (req: Request, res, next) => {
  try {
    const message = new MessageController(Env.lineItemSearchBotClientConfig);
    message.replyRakutenItemInfoByKeyword(req, res);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
