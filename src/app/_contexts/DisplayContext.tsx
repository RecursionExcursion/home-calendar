"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Coords, DailyForecast } from "../_types/display/weather";

type DisplayContextState = {
  coords: Coords;
  forecast: DailyForecast[];
};

export const DisplayContext = createContext<DisplayContextState>({
  coords: { lat: null, lng: null },
  forecast: [],
});

type DisplayProviderProps = {
  weatherJson?: string;
  children: React.ReactNode;
};

export const DisplayProvider = (props: DisplayProviderProps) => {
  const { children, weatherJson } = props;
  const [coords, setCoords] = useState<Coords>({ lat: null, lng: null });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  const forecast = JSON.parse(weatherJson ?? "[]") as DailyForecast[];

  const state: DisplayContextState = {
    coords,
    forecast,
  };

  return (
    <DisplayContext.Provider value={state}>{children}</DisplayContext.Provider>
  );
};

export const useDisplayContext = () => useContext(DisplayContext);
