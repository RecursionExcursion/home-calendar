"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getNextRoute } from "../lib/dashboardRouter";
import { msTimestamps } from "../lib/util";

export const useCalendarRouter = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    getNextRoute(pathname).then((nextRoute) => {
      setTimeout(() => {
        router.push(nextRoute!!);
      }, msTimestamps.oneMinute * 10);
    });
  }, []);
};
