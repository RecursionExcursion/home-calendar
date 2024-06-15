"use server";

import Calendar from "../../../../components/display/calendar/Calendar";

export default async function CalendarDayView() {
  return (
    <div className="greedy-container row-container" style={{ alignItems: "flex-start" }}>
      <Calendar mode={"day"} />
    </div>
  );
}
