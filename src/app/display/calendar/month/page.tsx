"use server";

import Calendar from "../../../../components/display/calendar/Calendar";

export default async function CalendarMonthView() {
  return (
    <div className="greedy-container row-container">
      <Calendar mode={"month"} />
    </div>
  );
}
