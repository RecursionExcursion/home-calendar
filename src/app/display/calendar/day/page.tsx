"use server";

import Calendar from "../../../../components/calendar/Calendar";

export default async function CalendarDayView() {
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
