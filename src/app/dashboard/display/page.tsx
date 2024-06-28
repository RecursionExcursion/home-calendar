import Link from "next/link";
import { calendarRoutes } from "../../../constants/routes";
import VerticalGrid from "../../../components/ui/VerticalGrid";

export default async function DashboardDisplayPage() {
  return (
    <VerticalGrid>
      <h2 className="db-h2">Views</h2>
      <Link className="link" href={calendarRoutes.month}>
        Month
      </Link>
      <Link className="link" href={calendarRoutes.week}>
        Week
      </Link>
      <Link className="link" href={calendarRoutes.day}>
        Day
      </Link>
    </VerticalGrid>
  );
}
