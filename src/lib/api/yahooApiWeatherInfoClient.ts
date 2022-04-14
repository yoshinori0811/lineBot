import { Env } from "../../env";

class YahooApiWeatherInfoClient {
  private apitoken: string;

  constructor() {
    if(!Env.yahooApi.apiToken) {
      throw new Error("API token is required.");
    }
    this.apitoken = Env.yahooApi.apiToken;
  }
}
