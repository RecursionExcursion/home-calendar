"use client";

import Calendar from "../../../../_components/calendar/Calendar";
import { useCalendarRouter } from "../../../../_hooks/useCalendarRouter";

export default function CalendarDayView() {
  useCalendarRouter();
  return <Calendar mode={"day"} />;
}
