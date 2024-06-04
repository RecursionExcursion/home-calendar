"use client";

import Calendar from "../../../../components/calendar/Calendar";
import { useCalendarRouter } from "../../../../hooks/useCalendarRouter";

export default function CalendarMonthView() {
  useCalendarRouter();
  return <Calendar mode={"month"} />;
}
