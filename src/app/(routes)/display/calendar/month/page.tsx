"use client";

import Calendar from "../../../../_components/calendar/Calendar";
import { useCalendarRouter } from "../../../../_hooks/useCalendarRouter";

export default function CalendarMonthView() {
  useCalendarRouter();
  return <Calendar mode={"month"} />;
}
