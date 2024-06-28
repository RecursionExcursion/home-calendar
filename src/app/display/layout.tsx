"use server";

import { redirect } from "next/navigation";
import { DisplayProvider } from "../../contexts/DisplayContext";
import { UserProvider } from "../../contexts/UserContext";
import { getUserIdFromCookie } from "../../lib/cookieManager";
import { getProjectedForecastJson } from "../../service/weatherService";
import { Coords, User } from "../../types";
import { getUser } from "../../service/userService";
import { getTasks } from "../../service/tasksService";
import { getBudget } from "../../service/budgetService";

type CalendarLayoutProps = {
  children: React.ReactNode;
};

export default async function CalendarLayout(props: CalendarLayoutProps) {
  const { children } = props;

  const userId = await getUserIdFromCookie();
  if (!userId) {
    redirect("/login");
  }
  const userJSON = await getUser(userId!!, "id");
  const user = JSON.parse(userJSON) as User;

  const coords: Coords = {
    lat: user.settings.userCoords?.lat ?? null,
    lng: user.settings.userCoords?.lon ?? null,
  };

  let tasksJSON: string | undefined;
  let forecastJSON: string | undefined;
  let budgetJSON: string | undefined;

  const forecastFetch = getProjectedForecastJson(coords);
  const tasksFetch = getTasks(userId);
  const budgetFetch = getBudget(userId);

  try {
    [forecastJSON, tasksJSON, budgetJSON] = await Promise.all([
      forecastFetch,
      tasksFetch,
      budgetFetch,
    ]);
  } catch (e) {}

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
