"use server";

import Calendar from "../../../../components/display/calendar/Calendar";

export default async function CalendarMonthView() {
  return <Calendar mode={"month"} />;
}
