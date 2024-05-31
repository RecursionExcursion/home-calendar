"use client";

import Calendar from "../../../../components/calendar/Calendar";
import { useCalendarRouter } from "../../../../hooks/useCalendarRouter";

export default function CalendarWeekView() {
  useCalendarRouter();
  return <Calendar mode={"week"} />;
}
