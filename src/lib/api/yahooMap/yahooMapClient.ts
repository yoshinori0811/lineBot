import fetch from "node-fetch";
import { Env } from "../../../env";

export class YahooMapClient {
  private apitoken: string;
  private baseUrl: string;
  constructor() {
    if (!Env.yahooApi.apiToken) {
      throw new Error("API token is required.");
    }
    this.apitoken = "&appid=" + Env.yahooApi.apiToken;
    this.baseUrl = "https://map.yahooapis.jp";
  }

  async getAddress(address: string) {
    const geocoderUrl = "/geocode/cont/V1/contentsGeoCoder?output=json";
    const requestPath = this.baseUrl + geocoderUrl + this.apitoken + "&query=" + encodeURI(address);
    const res = await fetch(requestPath);

    if (!res.ok) {
      throw new Error(`${res.status} : ${res.statusText}`);
    }

    return await res.json();
  }

  async getWeatherInfo(coordinates: string) {
    const weatherUrl = "/weather/V1/place?output=json";
    const requestPath = this.baseUrl + weatherUrl + this.apitoken + "&coordinates=" + coordinates;
    const res = await fetch(requestPath);

    if (!res.ok) {
      throw new Error(`${res.status} : ${res.statusText}`);
    }
    return await res.json();
  }
}
