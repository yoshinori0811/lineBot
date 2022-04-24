import express from "express";
import { Message } from "../../services/message";
import { ClientConfig, WebhookEvent } from "@line/bot-sdk";
import { YahooMapClient } from "../../../lib/api/yahooMap/yahooMapClient";
import { OpenWeatherMapClient } from "../../../lib/api/openWeatherMap/openWeatherMapClient";

export class MessageController {
  private message: Message;
  private yahooMapClient: YahooMapClient;
  private openWeatherMapClient: OpenWeatherMapClient;
  constructor(lineClientConfig: ClientConfig) {
    this.message = new Message(lineClientConfig);
    this.yahooMapClient = new YahooMapClient();
    this.openWeatherMapClient = new OpenWeatherMapClient();
  }

  replyRepeatMessage(req: express.Request, res: express.Response) {
    const events: WebhookEvent[] = req.body.events;
    events.map(async (event: WebhookEvent) => {
      if (event.type !== "message" || event.message.type !== "text") {
        return;
      }
      const text = event.message.text;
      await this.message.reply(event, text);

      res.status(200);
    });
  }

  replyWeatherInfo(req: express.Request, res: express.Response) {
    const events: WebhookEvent[] = req.body.events;
    events.map(async (event: WebhookEvent) => {
      if (event.type !== "message" || event.message.type !== "text") {
        return;
      }

      const receivedText = event.message.text;

      const addressData = await this.yahooMapClient.getAddress(receivedText);

      if (!addressData.Feature) {
        const text = "今日の天気を検索します!\n都市名を教えてください";
        this.message.reply(event, text);
        return;
      }

      const cityName = addressData.Feature[0].Name;
      if (!cityName.match(receivedText)) {
        const text = "住所がわかりませんでした...\n条件を変えてみてください";
        this.message.reply(event, text);
        return;
      }

      if (addressData.Feature.length > 1) {
        const text = "複数の候補が見つかりました\n条件を変えてみてください";
        this.message.reply(event, text);
        return;
      }

      const coordinates = addressData.Feature[0].Geometry.Coordinates.split(",");
      const lon = coordinates[0];
      const lat = coordinates[1];
      const weatherInfo = await this.openWeatherMapClient.getWeatherInfo(lon, lat);

      this.message.replyWeatherMessage(event, cityName, weatherInfo);
      res.status(200);
    });
  }
}
