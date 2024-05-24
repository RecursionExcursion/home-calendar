"use server";

import { get } from "http";

import { getProjectedForecast } from "../../_service/weatherService";
import { Coords } from "../../_types/display/weather";
import DisplayUI from "./UI";

export default async function DisplayPage() {
  const coordArr = process.env.COORDS?.split(",");

  if (!coordArr) {
    throw new Error("No coordinates found");
  }

  const coords: Coords = {
    lat: parseFloat(coordArr[0]),
    lng: parseFloat(coordArr[1]),
  };

  const forecast = await getProjectedForecast(coords ?? { lat: 0, lng: 0 });
  const forecastJSON = JSON.stringify(forecast);

  return <DisplayUI weatherJson={forecastJSON} />;
}
