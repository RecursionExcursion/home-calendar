"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getAllTasks } from "../service/task/taskService";
import { Budget, Coords, DailyForecast, Task, User } from "../types";
import { getBudget } from "../service/budget/budgetService";
import { getProjectedForecastJson } from "../service/weatherService";
import { getUserIdFromCookie } from "../lib/cookieManager";
import { getUser } from "../service/user/userService";

type ContentContextState = {
  updateContentState: (retrieveContent: ContentUpdateParams) => void;

  user: User;

  tasks: Task[];
  budget: Budget | undefined;
  forecast: DailyForecast[];
};

const ContentContext = createContext<ContentContextState>({} as ContentContextState);

type ContentProviderProps = {
  children: React.ReactNode;
};

type ContentUpdateParams = "tasks" | "charge" | "weather";

export const ContentProvider = (props: ContentProviderProps) => {
  const { children } = props;

  const [user, setUser] = useState({} as User);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [budget, setBudget] = useState<Budget>();
  const [forecast, setForecast] = useState<DailyForecast[]>([]);

  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    retrieveUser();
  }, []);

  useEffect(() => {
    if (!!user._id) {
      updateContentState().then(() => setContentLoaded(true));
    }
  }, [user]);

  const retrieveUser = async () => {
    const userId = await getUserIdFromCookie();
    if (!userId) {
      //This should never happen as it is handled in the middleware
      throw new Error("No user id found in cookie");
    }
    const userJson = await getUser(userId, "id");
    const parsedUser = JSON.parse(userJson) as User;
    setUser(parsedUser);
  };

  const retrieveTasks = async () => {
    const tasksJson = await getAllTasks();
    const parsedTasks = JSON.parse(tasksJson) as Task[];
    setTasks(parsedTasks);
  };

  const retrieveBudget = async () => {
    const budgetJson = await getBudget();
    const parsedBudget = JSON.parse(budgetJson) as Budget;
    setBudget(parsedBudget);
  };

  const retrieveForecast = async () => {
    const coords: Coords = {
      lat: user.settings.userCoords?.lat ?? null,
      lng: user.settings.userCoords?.lon ?? null,
    };

    if (!coords.lat || !coords.lng) return;

    const forecastJSON = await getProjectedForecastJson(coords);
    const paresedForecast = JSON.parse(forecastJSON ?? "[]") as DailyForecast[];
    setForecast(paresedForecast);
  };

  const updateContentState = async (contentToUpdate?: ContentUpdateParams) => {
    switch (contentToUpdate) {
      case "tasks":
        await retrieveTasks();
        break;
      case "charge":
        await retrieveBudget();
        break;
      case "weather":
        await retrieveForecast();
        break;
      default:
        retrieveTasks();
        retrieveBudget();
        retrieveForecast();
    }
  };

  if (!contentLoaded) return null;

  const state: ContentContextState = {
    updateContentState,
    user,
    tasks,
    budget,
    forecast,
  };

  return <ContentContext.Provider value={state}>{children}</ContentContext.Provider>;
};

export const useContentContext = () => useContext(ContentContext);
