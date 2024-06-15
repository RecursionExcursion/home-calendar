"use server";

import Link from "next/link";
import { calendarRoutes } from "../../../constants/routes";

export default async function DashboardDisplayPage() {
  return (
    <div className="col-container gap-0_5">
      <h2 className="db-h2">Views</h2>
      <div className="row-container gap-1">
        <Link className="link" href={calendarRoutes.month}>
          Month
        </Link>
        <Link className="link" href={calendarRoutes.week}>
          Week
        </Link>
        <Link className="link" href={calendarRoutes.day}>
          Day
        </Link>
      </div>
    </div>
  );
}
