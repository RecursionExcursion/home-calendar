"use client";

import BudgetDiplay from "../../../../components/budget/BudgetDisplay";
import Calendar from "../../../../components/calendar/Calendar";
import { useCalendarRouter } from "../../../../hooks/useCalendarRouter";

export default function CalendarWeekView() {
  useCalendarRouter();
  return (
    <div>
      <Calendar mode={"week"} />
      <BudgetDiplay />
    </div>
  );
}
