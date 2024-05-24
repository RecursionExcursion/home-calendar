"use server";

import { Coords, DailyForecast } from "../_types/display/weather";
import { stripTimeFromDate } from "./util";

const baseUrl = "https://api.weather.gov";
const locationUrl = `${baseUrl}/points`;

//https://api.weather.gov/points/43.06307,-86.22839

export const getProjectedForecastJson = async (
  coords: Coords
): Promise<string> => {
  const forecast = await getWeatherForcast(coords);

  const forecastMap = new Map<string, DailyForecast>();

  forecast.properties.periods.forEach((period: any) => {
    const date = stripTimeFromDate(new Date(period.startTime));
    const dateString = date.toISOString();

    if (forecastMap.has(dateString)) {
      const existingForecast = forecastMap.get(dateString);

      if (!existingForecast) {
        return [];
      }

      existingForecast.tempHigh = Math.max(
        existingForecast.tempHigh,
        period.temperature
      );

      existingForecast.tempLow = Math.min(
        existingForecast.tempLow,
        period.temperature
      );

      existingForecast.windSpeed.push(period.windSpeed);
      existingForecast.shortForecast.push(period.shortForecast);
    } else {
      forecastMap.set(dateString, {
        date: date.toISOString(),
        tempHigh: period.temperature,
        tempLow: period.temperature,
        shortForecast: [period.shortForecast],
        windSpeed: [period.windSpeed],
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
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
};
