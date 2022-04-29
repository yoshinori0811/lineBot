export type openWeatherMapApiResponse = {
  coord: coord;
  weather: weather[];
  base: string;
  main: main;
  visibility: number;
  wind: wind;
  rain: rain;
  clouds: clouds;
  dt: number;
  sys: sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

type coord = {
  lon: number;
  lat: number;
};

type weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type wind = {
  speed: number;
  deg: number;
};

type rain = {
  "1h": number;
};

type clouds = {
  all: number;
};

type main = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
};

type sys = {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
};
