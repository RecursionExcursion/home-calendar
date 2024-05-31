export type Coords = {
  lat: number | null;
  lng: number | null;
};

export type PartialForecast = {
  date: string;
  temp: number;
  shortForecast: string;
  windSpeed: string;
};

export type DailyForecast = {
  date: string;
  day?: PartialForecast;
  night?: PartialForecast;
};

export enum ForecastType {
  SUNNY = "Sunny",
  CLOUDY = "Cloudy",
  RAINY = "Rainy",
  SNOWY = "Snowy",
  STORMY = "Stormy",
  CLEAR = "Clear",
}
