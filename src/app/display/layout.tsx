"use server";

import { getBudget } from "../../api/service/budgetService";
import { getAllTasks } from "../../api/service/taskService";
import { getUser } from "../../api/service/userService";
import { DisplayProvider } from "../../contexts/DisplayContext";
import { UserProvider } from "../../contexts/UserContext";
import { getUserIdFromCookie } from "../../lib/cookieManager";
import { computeBudget } from "../../service/budgetService";
import { getProjectedForecastJson } from "../../service/weatherService";
import { Coords, User } from "../../types";

type CalendarLayoutProps = {
  children: React.ReactNode;
};

export default async function CalendarLayout(props: CalendarLayoutProps) {
  const { children } = props;

  //TODO: Possible decrypt the slug on the client side to obscure the slug
  const userId = await getUserIdFromCookie();
  const userJSON = await getUser(userId!!, "id");
  const user = JSON.parse(userJSON) as User;

  const coords: Coords = {
    lat: user.settings.userCoords?.lat ?? null,
    lng: user.settings.userCoords?.lon ?? null,
  };

  console.log({ coords });

  let tasksJSON: string | undefined;
  let forecastJSON: string | undefined;
  let budgetJSON: string | undefined;

  try {
    forecastJSON = await getProjectedForecastJson(coords);
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
