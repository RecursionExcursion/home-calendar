"use client";

import Calendar from "../../../../_components/calendar/Calendar";
import { useCalendarRouter } from "../../../../_hooks/useCalendarRouter";

export default function CalendarWeekView() {
  useCalendarRouter();
  return <Calendar mode={"week"} />;
}
