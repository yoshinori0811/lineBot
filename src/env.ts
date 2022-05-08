import { ClientConfig, MiddlewareConfig } from "@line/bot-sdk";
import dotenv from "dotenv";
dotenv.config();
export class Env {
  static port = process.env.PORT;

  static lineRepeatMessageBotMiddlewareConfig: MiddlewareConfig = {
    channelAccessToken: process.env.LINE_TESTBOT_CHANNEL_ACCESS_TOKEN || "",
    channelSecret: process.env.LINE_TESTBOT_CHANNEL_SECRET || "",
  };
  static lineRepeatMessageBotClientConfig: ClientConfig = {
    channelAccessToken: process.env.LINE_TESTBOT_CHANNEL_ACCESS_TOKEN || "",
    channelSecret: process.env.LINE_TESTBOT_CHANNEL_SECRET || "",
  };
  static lineWeatherBotMiddlewareConfig: MiddlewareConfig = {
    channelAccessToken: process.env.LINE_WEATHERBOT_CHANNEL_ACCESS_TOKEN || "",
    channelSecret: process.env.LINE_WEATHERBOT_CHANNEL_SECRET || "",
  };
  static lineWeatherBotClientConfig: ClientConfig = {
    channelAccessToken: process.env.LINE_WEATHERBOT_CHANNEL_ACCESS_TOKEN || "",
    channelSecret: process.env.LINE_WEATHERBOT_CHANNEL_SECRET || "",
  };

  static lineItemSearchBotMiddlewareConfig: MiddlewareConfig = {
    channelAccessToken: process.env.LINE_ITEMSEARCHBOT_CHANNEL_ACCESS_TOKEN || "",
    channelSecret: process.env.LINE_ITEMSEARCHBOT_CHANNEL_SECRET || "",
  };
  static lineItemSearchBotClientConfig: ClientConfig = {
    channelAccessToken: process.env.LINE_ITEMSEARCHBOT_CHANNEL_ACCESS_TOKEN || "",
    channelSecret: process.env.LINE_ITEMSEARCHBOT_CHANNEL_SECRET || "",
  };

  static yahooApi = {
    baseServiceUrl: "https://map.yahooapis.jp",
    apiToken: process.env.YAHOO_API_TOKEN || "",
    secret: process.env.YAHOO_API_SECRET || "",
  };

  static yahooApiWeatherInfo = {
    ...this.yahooApi,
    baseUrl: this.yahooApi.baseServiceUrl + "/weather/V1",
  };

  static openWeaterMapApi = {
    apiToken: process.env.OPENWEATHERMAP_API_TOKEN || "",
  };

  static rakutenDevelopersApi = {
    appId: process.env.RAKUTENDEVELOPERS_APPID || "",
  };
}

export {};
