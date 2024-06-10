type DaysOfWeekCalenderHeaderProps = {
  dayOfWeek: number;
  mode: "month" | "week" | "day";
};

export default function DaysOfWeekCalenderHeader(props: DaysOfWeekCalenderHeaderProps) {
  let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const { dayOfWeek, mode } = props;

  if (mode === "day") {
    daysOfWeek = [daysOfWeek[dayOfWeek]];
  }

  return (
    <>
      {daysOfWeek.map((day) => (
        <div
          key={day}
          style={{
            border: "1px solid white",
            borderCollapse: "collapse",
            display: "flex",
            justifyContent: "center",
            padding: "1rem 0",
          }}
        >
          {day}
        </div>
      ))}
    </>
  );
}
