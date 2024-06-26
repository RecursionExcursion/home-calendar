"use client";

import { useEffect, useState } from "react";
import { SurfForecastData } from "../../lib/surf/types";
import { getSurf } from "../../lib/surf/surfManager";

export default function SurfUI() {
  const [surfData, setSurfData] = useState<SurfForecastData>();

  useEffect(() => {
    getSurf().then((res) => {
      if (!res) return;
      const data = JSON.parse(res) as SurfForecastData;
      console.log(`Setting data`)
      setSurfData(data);
    });
  }, []);

  return (
    <div>
      {surfData &&
        Object.entries(surfData).map((pair) => {
          const key = pair[0];
          const val = pair[1];

          return (
            <div key={key}>
              <>{key}</>
              <>{val}</>
            </div>
          );
        })}
    </div>
  );
}
