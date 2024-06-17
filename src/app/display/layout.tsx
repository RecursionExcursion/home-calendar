"use server";

import { redirect } from "next/navigation";
import { getBudget } from "../../api/budget/budgetService";
import { getAllTasks } from "../../api/task/taskService";
import { getUser } from "../../api/user/userService";
import { DisplayProvider } from "../../contexts/DisplayContext";
import { UserProvider } from "../../contexts/UserContext";
import { getUserIdFromCookie } from "../../lib/cookieManager";
import { getProjectedForecastJson } from "../../service/weatherService";
import { Coords, User } from "../../types";

type CalendarLayoutProps = {
  children: React.ReactNode;
};

export default async function CalendarLayout(props: CalendarLayoutProps) {
  const { children } = props;

  //TODO: Possible decrypt the slug on the client side to obscure the slug
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

  try {
    forecastJSON = await getProjectedForecastJson(coords);
    tasksJSON = await getAllTasks();
    budgetJSON = await getBudget();
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
