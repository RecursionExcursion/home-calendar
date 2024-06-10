"use client";

import BudgetDiplay from "../../../../components/budget/BudgetDisplay";
import Calendar from "../../../../components/calendar/Calendar";
import { useCalendarRouter } from "../../../../hooks/useCalendarRouter";

export default function CalendarWeekView() {
  useCalendarRouter();
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Calendar mode={"week"} />
      <BudgetDiplay />
    </div>
  );
}
