"use server";

import { getAllTasks } from "../../(api)/service/taskService";
import { DisplayProvider } from "../../_contexts/DisplayContext";
import { UserProvider } from "../../_contexts/UserContext";
import { getProjectedForecastJson } from "../../_service/weatherService";
import { Coords } from "../../_types/display/weather";

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

  const forecastJSON = await getProjectedForecastJson(
    coords ?? { lat: 0, lng: 0 }
  );
  const tasksJSON = await getAllTasks();

  return (
    <UserProvider>
      <DisplayProvider weatherJson={forecastJSON} tasksJson={tasksJSON}>
        {children}
      </DisplayProvider>
    </UserProvider>
  );
}
