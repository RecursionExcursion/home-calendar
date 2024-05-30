"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getNextRoute } from "../_lib/dashboardRouter";
import { msTimestamps } from "../_lib/util";

export const useCalendarRouter = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    getNextRoute(pathname).then((nextRoute) => {
      setTimeout(() => {
        console.log("Redirecting to", nextRoute);
        router.push(nextRoute!!);
      }, msTimestamps.oneMinute * 10);
    });
  }, []);
};
