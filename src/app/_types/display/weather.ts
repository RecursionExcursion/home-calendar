export type Coords = {
  lat: number | null;
  lng: number | null;
};

export type DailyForecast = {
  date: string;
  tempHigh: number;
  tempLow: number;
  shortForecast: string[];
  windSpeed: string[];
};

export enum ForecastType {
  SUNNY = "Sunny",
  CLOUDY = "Cloudy",
  RAINY = "Rainy",
  SNOWY = "Snowy",
  STORMY = "Stormy",
  CLEAR = "Clear",
}
