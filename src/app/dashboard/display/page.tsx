"use server";

import { calendarRoutes } from "../../../constants/routes";
import { H2, Link } from "../../../components/base";

export default async function DashboardDisplayPage() {
  return (
    <div className="colContainer" style={{ gap: "0.5rem" }}>
      <H2>Views</H2>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Link href={calendarRoutes.month}>Month</Link>
        <Link href={calendarRoutes.week}>Week</Link>
        <Link href={calendarRoutes.day}>Day</Link>
      </div>
    </div>
  );
}
