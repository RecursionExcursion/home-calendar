"use client";

import { useEffect, useState } from "react";
import { SurfForecastData } from "../../lib/surf/types";
import { getSurf } from "../../lib/surf/surfManager";
import SurfCam from "./SurfCam";
import { IconGroupParams, SurfIcons } from "../../lib/icons/types";
import { getIconGroup } from "../../lib/icons/icons";
import useLoadingSpinner from "../../hooks/useLoadingSpinner";

export default function SurfUI() {
  const [surfData, setSurfData] = useState<SurfForecastData>();

  const { Spinner, setLoading } = useLoadingSpinner(true);

  useEffect(() => {
    getSurf().then((res) => {
      if (!res) return;
      const data = JSON.parse(res) as SurfForecastData;
      setSurfData(data);
      setLoading(false, 750);
    });
  }, []);

  const iconGroupParams: IconGroupParams = {
    iconGroup: "surf",
    iconPackage: "fi",
  };
  const icons = getIconGroup(iconGroupParams) as SurfIcons;
  const iconSize = 30;

  return (
    <Spinner>
      <div className="surf-grid">
        <div className={getSwimRiskStyle(surfData?.swimRisk ?? "")}>
          <span className="surf-grid-area-flag-risk">
            Swim Risk- {surfData?.swimRisk}
          </span>
          <span>Wave Height- {surfData?.waveHeight}</span>
          <span>Wave Period- {surfData?.wavePeriod}</span>
        </div>
        <div className="surf-grid-area-weather">
          <span>Temp- {surfData?.highTemp}</span>
          <span>Water Temp- {surfData?.waterTemp}</span>
          <span>Forecast- {surfData?.weather}</span>
          {surfData?.uvIndex && <span>UV- {surfData?.uvIndex}</span>}
        </div>
        <div className="surf-grid-area-sun">
          <div className="surf-suntime">
            <icons.sunrise size={iconSize} />
            {surfData?.sunrise}
          </div>
          <div className="surf-suntime">
            <icons.sunset size={iconSize} />
            {surfData?.sunset}
          </div>
        </div>
        <div className="surf-grid-area-cam">
          <SurfCam />
        </div>
      </div>
    </Spinner>
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
