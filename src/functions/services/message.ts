import { Client, ClientConfig, MessageEvent, TextMessage } from "@line/bot-sdk";
import { openWeatherMapApiResponse } from "../../lib/api/openWeatherMap/response/openWeatherMapType";
import { rakutenSerachItemResponse } from "../../lib/api/rakutenDevelopers/response/rakutenDevelopersType";

const WeatherType = {
  thunderstorm: "Thunderstorm",
  drizzle: "Drizzle",
  rain: "Rain",
  snow: "Snow",
  atmosphere: "Atmosphere",
  clear: "Clear",
  clouds: "Clouds",
} as const;

type WeatherType = typeof WeatherType[keyof typeof WeatherType];

export interface MessageInterface {
  /**
   * メッセージを返信する。
   *
   * @param event
   * @param messageText
   */
  reply(event: MessageEvent, messageText: string): void;
  /**
   * 対象地域の今日の天気を返信する。
   *
   * @param event
   * @param cityName
   * @param weatherInfo
   */
  replyWeatherMessage(event: MessageEvent, cityName: string, weatherInfo: openWeatherMapApiResponse): void;
}

export class Message extends Client implements MessageInterface {
  constructor(lineClientConfig: ClientConfig) {
    super(lineClientConfig);
  }

  async reply(event: MessageEvent, messageText: string) {
    const replyToken = event.replyToken;
    const text: TextMessage = {
      type: "text",
      text: messageText,
    };
    await this.replyMessage(replyToken, text);
  }

  async replyWeatherMessage(event: MessageEvent, cityName: string, weatherInfo: openWeatherMapApiResponse) {
    const weatherType = this.returnWeatherType(weatherInfo.weather[0].main);
    const maxTemp = weatherInfo.main.temp_max + "℃";
    const minTemp = weatherInfo.main.temp_min + "℃";

    const messageText = `今日の${cityName}の天気は${weatherType}です。\n最高気温: ${maxTemp}\n最低気温: ${minTemp}`;

    const text: TextMessage = {
      type: "text",
      text: messageText,
    };
    await this.replyMessage(event.replyToken, text);
  }

  async replyItemInfoMessage(event: MessageEvent, rakutenItemInfo: rakutenSerachItemResponse) {
    try {
      if (!event.source.userId) {
        throw new Error("userId is not found .");
      }

      const items = rakutenItemInfo.Items;
      const userId = event.source.userId;

      for (const [index, item] of items.entries()) {
        const name = item.itemName;
        const url = item.itemUrl;

        const text: TextMessage = {
          type: "text",
          text: `【検索結果: ${index + 1}件目】\n${name}`,
        };
        const itemUrl: TextMessage = {
          type: "text",
          text: `${url}`,
        };
        await this.pushMessage(userId, text);
        await this.pushMessage(userId, itemUrl);
      }
    } catch (err) {
      console.log(err);
      throw new Error(err as string);
    }
  }

  private returnWeatherType(propertyType: string) {
    switch (propertyType) {
      case WeatherType.thunderstorm:
        return "雷雨";
      case WeatherType.drizzle:
        return "霧雨";
      case WeatherType.rain:
        return "雨";
      case WeatherType.snow:
        return "雪";
      case WeatherType.atmosphere:
        return "その他の天気";
      case WeatherType.clear:
        return "晴れ";
      case WeatherType.clouds:
        return "曇り";
      default: {
        return propertyType;
      }
    }
  }
}
