"use server";

import { stripTimeFromDate } from "../lib/util";
import { Coords, DailyForecast, PartialForecast } from "../types";

const baseUrl = "https://api.weather.gov";
const locationUrl = `${baseUrl}/points`;

//https://api.weather.gov/points/43.06307,-86.22839

export const getProjectedForecastJson = async (
  coords: Coords
): Promise<string> => {
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
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
};
