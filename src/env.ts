import { ClientConfig, MiddlewareConfig } from "@line/bot-sdk";
import dotenv from "dotenv";
dotenv.config();
export class Env {

  static port = process.env.PORT;

  static clientConfig: ClientConfig = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || '',
    channelSecret: process.env.CHANNEL_SECRET || ''
  }
  static middlewareConfig: MiddlewareConfig = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || '',
    channelSecret: process.env.CHANNEL_SECRET || '',
  }
}

export {}
