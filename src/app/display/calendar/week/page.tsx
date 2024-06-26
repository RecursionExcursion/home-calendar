"use server";

import BudgetDiplay from "../../../../components/display/budget/BudgetDisplay";
import Calendar from "../../../../components/display/calendar/Calendar";

export default async function CalendarWeekView() {
  return (
    <div className="flex-col">
      <Calendar mode={"week"} />
      <BudgetDiplay />
    </div>
  );
}
