"use server";

import { getBudget } from "../../api/service/budgetService";
import { getAllTasks } from "../../api/service/taskService";
import { DisplayProvider } from "../../contexts/DisplayContext";
import { UserProvider } from "../../contexts/UserContext";
import { computeBudget } from "../../service/budgetService";
import { getProjectedForecastJson } from "../../service/weatherService";
import { Coords } from "../../types";

type CalendarLayoutProps = {
  children: React.ReactNode;
};

export default async function CalendarLayout(props: CalendarLayoutProps) {
  const { children } = props;

  const coordArr = process.env.COORDS?.split(",");

  if (!coordArr) {
    throw new Error("No coordinates found");
  }

  const coords: Coords = {
    lat: parseFloat(coordArr[0]),
    lng: parseFloat(coordArr[1]),
  };

  let tasksJSON: string | undefined;
  let forecastJSON: string | undefined;
  let budgetJSON: string | undefined;

  try {
    forecastJSON = await getProjectedForecastJson(coords ?? { lat: 0, lng: 0 });
    tasksJSON = await getAllTasks();
    budgetJSON = await getBudget();
  } catch (e) {}

  await computeBudget(budgetJSON);

  return (
    <UserProvider>
      <DisplayProvider
        weatherJson={forecastJSON}
        tasksJson={tasksJSON}
        budgetJson={budgetJSON}
      >
        {children}
      </DisplayProvider>
    </UserProvider>
  );
}
