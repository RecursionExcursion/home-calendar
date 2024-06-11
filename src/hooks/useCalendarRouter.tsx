"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { msTimestamps } from "../lib/util";
import { calendarRoutes } from "../constants/routes";

export const useCalendarRouter = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let isMounted = true;
    let timeout: NodeJS.Timeout;

    const handleRouteChange = async () => {
      const nextRoute = await getNextRoute(pathname);
      if (isMounted) {
        timeout = setTimeout(() => {
          router.replace(nextRoute!!);
        }, msTimestamps.oneMinute * 10);
      }
    };

    handleRouteChange();

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [pathname, router]);

  return null;
};

const routes = new Map<string, string>([
  // ["day", calendarRoutes.day],
  ["week", calendarRoutes.week],
  ["month", calendarRoutes.month],
]);

const getNextRoute = (currentPath: string) => {
  const pathParts = currentPath.split("/");
  const route = pathParts[pathParts.length - 1];

  const routeKeys = Array.from(routes.keys());
  const numOfRoutes = routeKeys.length;

  if (!routeKeys.includes(route)) {
    throw new Error("Invalid route");
  }

  const nextRouteIndex = (routeKeys.indexOf(route) + 1) % numOfRoutes;

  return routes.get(routeKeys[nextRouteIndex]);
};
