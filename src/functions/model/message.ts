import { Env } from "../../env";
import { Client, MessageEvent, TextMessage } from "@line/bot-sdk";

export interface MessageInterface {
  /**
   * メッセージを返信する。
   *
   * @param event
   * @param messageText
   */
  reply(event: MessageEvent, messageText: string): void

}

export class Message extends Client implements MessageInterface {
  constructor() {
    super(Env.clientConfig);
  }

  async reply(event: MessageEvent, messageText: string) {
    const replyToken = event.replyToken
    const text: TextMessage = {
      type: 'text',
      text: messageText
    }
    await this.replyMessage(replyToken, text)
  }
}