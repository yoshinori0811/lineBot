import fetch from "node-fetch";
import { Env } from "../../../env";
import { openWeatherMapApiResponse } from "./response/openWeatherMapType";

export class OpenWeatherMapClient {
  private appid: string;
  private baseUrl: string;
  constructor() {
    if (!Env.openWeaterMapApi.apiToken) {
      throw new Error("API token is required.");
    }
    this.appid = "&appid=" + Env.openWeaterMapApi.apiToken;
    this.baseUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
  }

  async getWeatherInfo(lon: string, lat: string): Promise<openWeatherMapApiResponse> {
    const coordinates = "&lon=" + lon + "&lat=" + lat;
    const requestPath = this.baseUrl + this.appid + coordinates;

    const res = await fetch(requestPath);

    if (!res.ok) {
      throw new Error(`${res.status} : ${res.statusText}`);
    }

    return (await res.json()) as openWeatherMapApiResponse;
  }
}
