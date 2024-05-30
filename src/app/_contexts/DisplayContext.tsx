"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Coords, DailyForecast } from "../_types/display/weather";
import { Task } from "../_types/models/task";
import { usePathname, useRouter } from "next/navigation";
import { getNextRoute } from "../_lib/dashboardRouter";

type DisplayContextState = {
  coords: Coords;
  forecast: DailyForecast[];
  tasks: Task[];
};

export const DisplayContext = createContext<DisplayContextState>({
  coords: { lat: null, lng: null },
  forecast: [],
  tasks: [],
});

type DisplayProviderProps = {
  weatherJson?: string;
  tasksJson?: string;
  children: React.ReactNode;
};

export const DisplayProvider = (props: DisplayProviderProps) => {
  const { children, weatherJson, tasksJson } = props;
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
  const tasks = JSON.parse(tasksJson ?? "[]") as Task[];

  const state: DisplayContextState = {
    coords,
    forecast,
    tasks,
  };

  return (
    <DisplayContext.Provider value={state}>{children}</DisplayContext.Provider>
  );
};

export const useDisplayContext = () => useContext(DisplayContext);
