"use server";

import Calendar from "../../../../components/display/calendar/Calendar";

export default async function CalendarDayView() {
  return (
    <div className="greedyContainer rowContainer" style={{ alignItems: "flex-start" }}>
      <Calendar mode={"day"} />
    </div>
  );
}
