"use client";

import { useEffect, useState } from "react";
import { SurfForecastData } from "../../lib/surf/types";
import { getSurf } from "../../lib/surf/surfManager";
import SurfCam from "./SurfCam";

export default function SurfUI() {
  const [surfData, setSurfData] = useState<SurfForecastData>();

  useEffect(() => {
    getSurf().then((res) => {
      if (!res) return;
      const data = JSON.parse(res) as SurfForecastData;
      console.log(`Setting data`);
      setSurfData(data);
    });
  }, []);

  const swimRiskStyle = surfData?.swimRisk?.includes("low");

  return (
    <div className="surf-grid">
      <div className={getSwimRiskStyle(surfData?.swimRisk ?? "")}>
        <div className="flex-col">
          <span>Swim Risk- {surfData?.swimRisk}</span>
          <span>Wave Height- {surfData?.waveHeight}</span>
          <span>Wave Period- {surfData?.wavePeriod}</span>
        </div>
      </div>
      <div className="surf-grid-area-temp">
        <div className="flex-col">
          <span>Temp- {surfData?.highTemp}</span>
          <span>Water Temp- {surfData?.waterTemp}</span>
          <span>Forecast- {surfData?.weather}</span>
          {surfData?.uvIndex && <span>UV- {surfData?.uvIndex}</span>}
        </div>
      </div>
      <div className="surf-grid-area-sun">
        <div className="flex-col">
          <span>Sunrise- {surfData?.sunrise}</span>
          <span>Suneset- {surfData?.sunset}</span>
        </div>
      </div>
      <div className="surf-grid-area-weather">
        <SurfCam />
      </div>
    </div>
  );
}

const getSwimRiskStyle = (swimRisk: string) => {
  const fallback = "surf-grid-area-flag";

  if (swimRisk === "") return fallback;

  const text = swimRisk.toLowerCase();

  const green = "surf-grid-area-flag-green";
  const yellow = "surf-grid-area-flag-yellow";
  const red = "surf-grid-area-flag-red";

  return text.includes("low") ? green : text.includes("high") ? red : yellow;
};
