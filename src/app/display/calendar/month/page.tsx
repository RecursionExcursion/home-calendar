"use server";

import Calendar from "../../../../components/display/calendar/Calendar";

export default async function CalendarMonthView() {
  return (
    <div className="full flex">
      <Calendar mode={"month"} />
    </div>
  );
}
