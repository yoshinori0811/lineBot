import { Env } from "../../env";
import { Client, TextMessage, WebhookEvent } from "@line/bot-sdk";

export interface MessageInterface {
  /**
   * メッセージを返信する。
   *
   * @param event
   * @param messageText
   */
  reply(event: WebhookEvent, messageText: string): void

}

export class Message extends Client implements MessageInterface {
  constructor() {
    super(Env.clientConfig);
  }

  async reply(event: WebhookEvent, messageText: string) {
    try {
      if(event.type !== 'message' || event.message.type !== 'text') {
        return;
      }
      const replyToken = event.replyToken
      const text: TextMessage = {
        type: 'text',
        text: messageText
      }

      await this.replyMessage(replyToken, text)

    } catch (err) {
      console.log(err);
    }
  }
}
