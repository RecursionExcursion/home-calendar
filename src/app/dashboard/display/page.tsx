"use client";

import { calendarRoutes } from "../../../constants/routes";
import { H2, Link } from "../../../components/base";
import WeatherOptionsMenu from "../../../components/dashboard/display/WeatherOptionsMenu";
import { useState } from "react";
import Spinner from "../../../components/base/Spinner";

export const fetchCache = "force-no-store";

export default function DashboardDisplayPage() {
  const [loading, setLoading] = useState(false);

  return loading ? (
    <Spinner />
  ) : (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <H2>Views</H2>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Link href={calendarRoutes.month}>Month</Link>
        <Link href={calendarRoutes.week}>Week</Link>
        <Link href={calendarRoutes.day}>Day</Link>
      </div>
      <WeatherOptionsMenu setLoadingState={setLoading} />
    </div>
  );
}
