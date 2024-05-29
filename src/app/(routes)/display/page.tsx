"use server";

import { DisplayProvider } from "../../_contexts/DisplayContext";
import { getAllTasks } from "../../(api)/service/taskService";
import { getProjectedForecastJson } from "../../_service/weatherService";
import { Coords } from "../../_types/display/weather";
import CalenderController from "../../_components/calendar/CalendarController";
import { UserProvider } from "../../_contexts/UserContext";

export default async function DisplayPage() {
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
        <CalenderController />
      </DisplayProvider>
    </UserProvider>
  );
}
