"use server";

import BudgetDiplay from "../../../../components/budget/BudgetDisplay";
import Calendar from "../../../../components/calendar/Calendar";

export default async function CalendarWeekView() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Calendar mode={"week"} />
      <BudgetDiplay />
    </div>
  );
}
