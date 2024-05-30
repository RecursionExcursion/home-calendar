"use server";

import { calendarRoutes } from "../_constants/routes";

const routes = new Map<string, string>([
  ["day", calendarRoutes.day],
  ["week", calendarRoutes.week],
  ["month", calendarRoutes.month],
]);

export const getNextRoute = async (currentPath: string) => {
  const pathParts = currentPath.split("/");
  const route = pathParts[pathParts.length - 1];

  switch (route) {
    case "day":
      return routes.get("month");
    case "week":
      return routes.get("day");
    case "month":
      return routes.get("week");
    default:
      throw new Error("Invalid route");
  }
};
