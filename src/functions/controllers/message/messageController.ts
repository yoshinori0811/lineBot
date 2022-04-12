import express from "express";
import { Message } from "../../model/message";
import { WebhookEvent } from "@line/bot-sdk";

export class MessageController {
  private message: Message;
  constructor() {
    this.message = new Message();
  }

  replyRepeatMessage(req: express.Request,res: express.Response) {
    const events: WebhookEvent[] = req.body.events;
    events.map(async (event: WebhookEvent) => {
      try {
        if(event.type !== 'message' || event.message.type !== 'text') {
          return;
        }
        const text = event.message.text;
        await this.message.reply(event, text);

      } catch (err) {
        console.log(err);

      }
      res.status(200);
    });
  }
}
