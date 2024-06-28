"use server";

import Link from "next/link";
import { calendarRoutes } from "../../../constants/routes";
import ClientSideLoadState from "../../../components/misc/ClientLoadState";

export default async function DashboardDisplayPage() {
  return (
    <div className="db-vert-grid">
      <div className="db-vert-grid-card-1">
        <h2 className="db-h2">Views</h2>
      </div>
      <div className="db-vert-grid-card-2">
        <Link className="link" href={calendarRoutes.month}>
          Month
        </Link>
      </div>
      <div className="db-vert-grid-card-3">
        <Link className="link" href={calendarRoutes.week}>
          Week
        </Link>
      </div>
      <div className="db-vert-grid-card-4">
        <Link className="link" href={calendarRoutes.day}>
          Day
        </Link>
      </div>
      <ClientSideLoadState msDelay={1500} />
    </div>
  );
}
