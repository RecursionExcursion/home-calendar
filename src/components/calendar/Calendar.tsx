"use client";

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
    <div className="flex flex-col items-center w-full h-full">
      <h1>{`${getFullMonthName(date)} ${date.getFullYear()}`}</h1>
      {mode === "day" ? (
        <Grid1
          headers={
            <DaysOfWeekCalenderHeader
              mode={mode ?? "month"}
              dayOfWeek={date.getDay()}
            />
          }
          daySqauares={generateDaySquares(params)}
        />
      ) : (
        <Grid7
          headers={
            <DaysOfWeekCalenderHeader
              mode={mode ?? "month"}
              dayOfWeek={date.getDay()}
            />
          }
          daySqauares={generateDaySquares(params)}
        />
      )}
    </div>
  );
}

type GridProps = {
  headers: JSX.Element;
  daySqauares: JSX.Element[];
};

const Grid7 = (props: GridProps) => {
  const { headers, daySqauares } = props;
  return (
    <>
      <div className="hidden md:grid  grid-cols-7 w-full border-b-0">
        {headers}
      </div>
      <div className="grid grid-cols-3 md:grid-cols-7 h-full w-full">
        {daySqauares.map((daySquare) => daySquare)}
      </div>
    </>
  );
};

const Grid1 = (props: GridProps) => {
  const { headers, daySqauares } = props;
  return (
    <>
      <div className="grid grid-cols-1 w-full border-b-0">{headers}</div>
      <div className="grid grid-cols-1 h-full w-full">
        {daySqauares.map((daySquare) => daySquare)}
      </div>
    </>
  );
};

const calenderLengthMap = new Map<Mode, number>([
  ["month", 35],
  ["week", 7],
  ["day", 1],
]);

const getCalendarStartDate = (mode: Mode, date: Date): Date => {
  return mode === "month" ? getFirstOnCalender(date) : date;
};

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
