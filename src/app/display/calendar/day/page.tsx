"use server";

import Calendar from "../../../../components/display/calendar/Calendar";

export default async function CalendarDayView() {
  return (
    <div className="day-view-wrapper">
      <Calendar mode={"day"} />
    </div>
  );
}
