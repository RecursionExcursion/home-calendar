"use client";

import { Grid1, Grid7 } from "./CalenderGrids";
import DaySquare from "./DaySquare";
import DaysOfWeekCalenderHeader from "./DaysOfWeekCalenderHeader";
import { changeDate, getFirstOnCalender, getFullMonthName } from "./util";

type Mode = "month" | "week" | "day";

export type CalendarProps = {
  mode?: Mode;
};

export default function Calendar(props: CalendarProps) {
  const { mode = "month" } = props;

  const date = new Date();

  const params = { mode, date };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "98%",
      }}
    >
      <h1>{`${getFullMonthName(date)} ${date.getFullYear()}`}</h1>
      {mode === "day" ? (
        <Grid1
          headers={
            <DaysOfWeekCalenderHeader mode={mode ?? "month"} dayOfWeek={date.getDay()} />
          }
          daySqauares={generateDaySquares(params)}
        />
      ) : (
        <Grid7
          headers={
            <DaysOfWeekCalenderHeader mode={mode ?? "month"} dayOfWeek={date.getDay()} />
          }
          daySqauares={generateDaySquares(params)}
        />
      )}
    </div>
  );
}

const generateDaySquares = ({
  mode,
  date,
}: {
  mode: Mode;
  date: Date;
}): JSX.Element[] => {
  const calendarLength = calenderLengthMap.get(mode) ?? 0;
  const calenderStartDate = getCalendarStartDate(mode, date);

  return Array.from({ length: calendarLength }).map((_, i) => {
    const date = changeDate(calenderStartDate, i, "day");
    return <DaySquare key={i} date={date} />;
  });
};

const calenderLengthMap = new Map<Mode, number>([
  ["month", 35],
  ["week", 7],
  ["day", 1],
]);

const getCalendarStartDate = (mode: Mode, date: Date): Date => {
  return mode === "month" ? getFirstOnCalender(date) : date;
};
