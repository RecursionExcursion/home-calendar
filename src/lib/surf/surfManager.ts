"use server";

import { createSurfCookie, getSurfCookie } from "../cookieManager";
import { scrapeForSurf } from "./surfScraper";
import { SurfForecastData } from "./types";

export const getSurf = async () => {
  const cookie = await getSurfCookie();

  if (cookie) {
    const surfData = JSON.parse(cookie.value) as SurfForecastData;
    return JSON.stringify(surfData);
  }

  console.log("Scrapping for surf data");
  const surfData = await scrapeForSurf();

  if (!surfData) return;

  const now = new Date();

  const times = getSurfUpdateTimes();

  const nextTime = Object.values(times)
    .sort((a, b) => a.getTime() - b.getTime())
    .find((t) => t.getTime() > now.getTime());

  if (nextTime) {
    await createSurfCookie(JSON.stringify(surfData), nextTime);
  }

  return JSON.stringify(surfData);
};

/*Update times are 04:10 11:10 16:10 22:10
 * https://forecast.weather.gov/product.php?site=GRR&issuedby=GRR&product=SRF&format=CI&version=1&glossary=1
 */
const getSurfUpdateTimes = () => {
  const now = new Date();

  const times = {
    410: setToHour(4, now),
    1100: setToHour(11, now),
    1610: setToHour(16, now),
    2210: setToHour(22, now),
  };

  return times;
};

const setToHour = (hour: number, date: Date) => {
  const newDate = new Date(date);
  if (hour > 23 || hour < 1) {
    throw Error("Hour is out of expected bounds");
  }
  newDate.setHours(hour);
  newDate.setMinutes(10);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);
  return newDate;
};
