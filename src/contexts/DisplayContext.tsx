"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Budget, Coords, DailyForecast, Task } from "../types";
import { getBudget } from "../api/service/budgetService";

//TODO Check if coords is actually being used
type DisplayContextState = {
  coords: Coords;
  forecast: DailyForecast[];
  tasks: Task[];
  budget: Budget;
};

export const DisplayContext = createContext<DisplayContextState>({
  coords: { lat: null, lng: null },
  forecast: [],
  tasks: [],
  budget: {} as Budget,
});

type DisplayProviderProps = {
  budgetJson?: string;
  displayBudgetJson?: string;
  weatherJson?: string;
  tasksJson?: string;
  children: React.ReactNode;
};

export const DisplayProvider = (props: DisplayProviderProps) => {
  const { children, weatherJson, tasksJson, budgetJson } = props;
  const [coords, setCoords] = useState<Coords>({ lat: null, lng: null });
  const [budget, setBudget] = useState<Budget>({} as Budget);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }

    if (!budgetJson) return;

    const parsed = JSON.parse(budgetJson) as Budget;
    setBudget(parsed);

    setLoaded(true);
  }, []);

  if (!loaded) return null;

  const forecast = JSON.parse(weatherJson ?? "[]") as DailyForecast[];
  const tasks = JSON.parse(tasksJson ?? "[]") as Task[];

  const state: DisplayContextState = {
    coords,
    forecast,
    tasks,
    budget,
  };

  return (
    <DisplayContext.Provider value={state}>{children}</DisplayContext.Provider>
  );
};

export const useDisplayContext = () => useContext(DisplayContext);
