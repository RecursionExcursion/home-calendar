type DaysOfWeekCalenderHeaderProps = {
  dayOfWeek: number;
  mode: "month" | "week" | "day";
};

export default function DaysOfWeekCalenderHeader(
  props: DaysOfWeekCalenderHeaderProps
) {
  let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const { dayOfWeek, mode } = props;

  if (mode === "day") {
    daysOfWeek = [daysOfWeek[dayOfWeek]];
  }

  return (
    <>
      {daysOfWeek.map((day) => (
        <div key={day} className="border border-white flex justify-center py-4">
          {day}
        </div>
      ))}
    </>
  );
}
