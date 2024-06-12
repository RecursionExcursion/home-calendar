"use client";

import { useCalendarRouter } from "../../hooks/useCalendarRouter";
import { changeDate, getFirstOnCalender, getFullMonthName } from "../../util";
import { Grid1, Grid7 } from "./CalenderGrids";
import DaySquare from "./DaySquare";
import DaysOfWeekCalenderHeader from "./DaysOfWeekCalenderHeader";

type Mode = "month" | "week" | "day";

export type CalendarProps = {
  mode?: Mode;
};

export default function Calendar(props: CalendarProps) {
  useCalendarRouter();

  const { mode = "month" } = props;

  const date = new Date();

  const params = { mode, date };

  const monthName = `${getFullMonthName(date)} ${date.getFullYear()}`;

  const generateCalendar = () => {
    if (mode === "day") {
      return (
        <Grid1
          headers={
            <DaysOfWeekCalenderHeader mode={mode ?? "month"} dayOfWeek={date.getDay()} />
          }
          daySqauares={generateDaySquares(params)}
        />
      );
    }
    return (
      <Grid7
        headers={
          <DaysOfWeekCalenderHeader mode={mode ?? "month"} dayOfWeek={date.getDay()} />
        }
        daySqauares={generateDaySquares(params)}
      />
    );
  };

  return (
    <div className="colContainer" style={{ gap: "0rem", width: "98%" }}>
      <h1 style={{ padding: "0.5rem 0" }}>{monthName}</h1>
      {generateCalendar()}
    </div>
  );
}

type params = { mode: Mode; date: Date };

const generateDaySquares = ({ mode, date }: params): JSX.Element[] => {
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
