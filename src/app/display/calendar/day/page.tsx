"use client";

import Calendar from "../../../../components/calendar/Calendar";
import { useCalendarRouter } from "../../../../hooks/useCalendarRouter";

export default function CalendarDayView() {
  useCalendarRouter();
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Calendar mode={"day"} />
    </div>
  );
}
