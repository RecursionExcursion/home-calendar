"use server";

import { stripTimeFromDate } from "../lib/util";
import { Coords, DailyForecast, PartialForecast } from "../types";

const baseUrl = "https://api.weather.gov";
const locationUrl = `${baseUrl}/points`;

//https://api.weather.gov/points/43.06307,-86.22839

export const getProjectedForecastJson = async (coords: Coords): Promise<string> => {
  if (!coords.lat || !coords.lng) {
    return JSON.stringify([]);
  }

  const forecast = await getWeatherForcast(coords);

  const forecastMap = new Map<string, DailyForecast>();

  forecast.properties.periods.forEach((period: any) => {
    const rawDate = new Date(period.startTime);
    const dateString = stripTimeFromDate(rawDate).toISOString();

    const partialForcast: PartialForecast = {
      date: rawDate.toISOString(),
      temp: period.temperature,
      shortForecast: period.shortForecast,
      windSpeed: period.windSpeed,
      windDirection: period.windDirection,
      detailedForecast: period.detailedForecast,
    };

    if (forecastMap.has(dateString)) {
      const existingForecast = forecastMap.get(dateString);

      if (!existingForecast) {
        return [];
      }

      existingForecast.night = partialForcast;
    } else {
      period.isDaytime
        ? forecastMap.set(dateString, {
            date: dateString,
            day: partialForcast,
          })
        : forecastMap.set(dateString, {
            date: dateString,
            night: partialForcast,
          });
    }
  });

  const weeklyForcast = Array.from(forecastMap.values());

  return JSON.stringify(weeklyForcast);
};

const getWeatherForcast = async (coords: Coords) => {
  const weatherUrl = `${locationUrl}/${coords.lat},${coords.lng}`;

  const weatherApiRespObj = await fetchApi(weatherUrl);
  const forecast = await fetchApi(weatherApiRespObj.properties.forecast);

  return forecast;
};

const fetchApi = async (url: string) => {
  return fetch(url, { next: { revalidate: 0 } })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("There has been a problem with your fetch operation:", error);
    });
};

export type Suntime = {
  date: string;
  sunrise: string;
  sunset: string;
  firstLight: string;
  lastLight: string;
  dawn: string;
  dusk: string;
  solarNoon: string;
  goldenHour: string;
  dayLength: string;
  timeZone: string;
  utcOffset: string;
};

// https://api.sunrisesunset.io/json?lat=38.907192&lng=-77.036873
export const fetchSunTimes = async (coords: Coords) => {
  const res = await fetchApi(
    `https://api.sunrisesunset.io/json?lat=${coords.lat}&lng=${coords.lng}`
  );

  const results = res.results;

  const sunTimes: Suntime = {
    date: results.date,
    sunrise: results.sunrise,
    sunset: results.sunset,
    firstLight: results.first_light,
    lastLight: results.last_light,
    dawn: results.dawn,
    dusk: results.dusk,
    solarNoon: results.solar_noon,
    goldenHour: results.golden_hour,
    dayLength: results.day_length,
    timeZone: results.timezone,
    utcOffset: results.utc_offset,
  };

  return sunTimes;
};
