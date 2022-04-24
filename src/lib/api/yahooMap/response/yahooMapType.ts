//  yahoo気象情報APIから取得するJSONの型
export type yahooApiResponse = {
  ResultInfo: resultInfo;
  Feature?: feature[];
};

type resultInfo = {
  Count: number;
  Total: number;
  Start: number;
  Latency: number; // MEMO: 少数点第２位
  Status: number;
  Description: string;
  Copyright: string;
  // CompressType: ,
};

type feature = {
  Id: 1;
  Name: string;
  Description?: string;
  Geometry: geometry;
  Property: geocodeProperty | weatherProperty;
};

type geometry = {
  Type: string;
  Coordinates: string;
};

type geocodeProperty = {
  Genre: number;
  Query: string;
  Address: string;
  AddressKana: string;
  AddressElement: addressElement[];
};

type addressElement = {
  Name: string;
  Kana: string;
};

type weatherProperty = {
  WeatherList?: { weather: weather[] };
};

// yahoo geocodeAPIから取得するJSONの型
type weather = {
  Type: string;
  Date: string;
  Rainfall: number;
};
