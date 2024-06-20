"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Budget, DailyForecast, Task } from "../types";

//TODO Check if coords is actually being used
type DisplayContextState = {
  forecast: DailyForecast[];
  tasks: Task[];
  budget: Budget;
};

export const DisplayContext = createContext<DisplayContextState>({
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
  const [budget, setBudget] = useState<Budget>({} as Budget);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!budgetJson) return;

    const parsed = JSON.parse(budgetJson) as Budget;
    setBudget(parsed);

    setLoaded(true);
  }, []);

  if (!loaded) return null;

  const forecast = JSON.parse(weatherJson ?? "[]") as DailyForecast[];
  const tasks = JSON.parse(tasksJson ?? "[]") as Task[];

  const state: DisplayContextState = {
    forecast,
    tasks,
    budget,
  };

  return (
    <DisplayContext.Provider value={state}>
      <div className="full relative">{children}</div>
    </DisplayContext.Provider>
  );
};

export const useDisplayContext = () => useContext(DisplayContext);
