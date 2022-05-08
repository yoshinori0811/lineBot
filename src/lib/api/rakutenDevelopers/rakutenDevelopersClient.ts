import { Env } from "../../../env";
import { rakutenSerachItemResponse } from "./response/rakutenDevelopersType";
import axios, { AxiosRequestConfig } from "axios";

export class RakutenDevelopersClient {
  private baseUrl: string;
  private appId: string;
  constructor() {
    this.baseUrl = "https://app.rakuten.co.jp/services/api/";
    this.appId = "applicationId=" + Env.rakutenDevelopersApi.appId;
  }

  async getItemByKeyword(keyword: string): Promise<rakutenSerachItemResponse> {
    const url = "IchibaItem/Search/20170706?";
    const targetItem = "&keyword=" + encodeURI(keyword);
    const requestParams = "&formatVersion=2&hits=5";
    const requestPath = this.baseUrl + url + this.appId + requestParams + targetItem;
    const options: AxiosRequestConfig = {
      url: requestPath,
      method: "GET",
    };

    try {
      const res = await axios(options);
      return (await res.data) as rakutenSerachItemResponse;
    } catch (err) {
      if (!axios.isAxiosError(err)) {
        throw new Error(`${err}` as string);
      }
      if (!err.response) {
        throw new Error(`${err.message}`);
      }
      throw new Error(`${err.response.status} : ${err.message}`);
    }
  }
}
