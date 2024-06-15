type DaysOfWeekCalenderHeaderProps = {
  dayOfWeek: number;
  mode: "month" | "week" | "day";
};

export default function DaysOfWeekCalenderHeader(props: DaysOfWeekCalenderHeaderProps) {
  let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const { dayOfWeek, mode } = props;

  switch (mode) {
    case "month":
      break;

    case "day":
      daysOfWeek = [daysOfWeek[dayOfWeek]];
      break;

    case "week":
      daysOfWeek = daysOfWeek.concat(daysOfWeek.splice(0, dayOfWeek));
      break;
  }

  return (
    <>
      {daysOfWeek.map((day) => (
        <div
          key={day}
          className="row-container basic-border"
          style={{ padding: "1rem 0" }}
        >
          {day}
        </div>
      ))}
    </>
  );
}
