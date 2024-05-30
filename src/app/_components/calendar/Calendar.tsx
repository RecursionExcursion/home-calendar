"use client";

import DaySquare from "./DaySquare";
import DaysOfWeekCalenderHeader from "./DaysOfWeekCalenderHeader";
import { changeDate, isSameDate } from "./util";
import { useDisplayContext } from "../../_contexts/DisplayContext";

type Mode = "month" | "week" | "day";

type CalendarProps = {
  mode?: Mode;
};

export default function Calendar(props: CalendarProps) {
  const { mode = "month" } = props;
  const { forecast, tasks } = useDisplayContext();
  const date = new Date();

  const modeParams = createModeParams(mode, date);

  const gridStyle1 = `grid grid-cols-1 h-full w-full`;
  const gridStyle7 = `grid grid-cols-3 md:grid-cols-7 h-full w-full`;
  const headerStyle1 = `grid grid-cols-1 w-full border-b-0`;
  const headerStyle7 = `hidden md:grid  grid-cols-7 w-full border-b-0`;

  const style = {
    grid: modeParams.rowSize === 1 ? gridStyle1 : gridStyle7,
    head: modeParams.rowSize === 1 ? headerStyle1 : headerStyle7,
  };

  return (
    <div className="flex flex-col items-center w-full h-full">
      <h1>{`${modeParams.fullMonthName} ${date.getFullYear()}`}</h1>

      <div className={style.head}>
        <DaysOfWeekCalenderHeader
          mode={mode ?? "month"}
          dayOfWeek={date.getDay()}
        />
      </div>
      <div className={style.grid}>
        {Array.from({ length: modeParams.calenderLength }).map((_, index) => {
          const date = changeDate(modeParams.startDate, index, "day");

          const forecastForDate = forecast
            .filter((forecast) => {
              const forecastDate = new Date(forecast.date);
              const adjustedForecastDate = new Date(
                forecastDate.getUTCFullYear(),
                forecastDate.getUTCMonth(),
                forecastDate.getUTCDate()
              );
              const currentDate = new Date(date.toUTCString());

              return isSameDate(adjustedForecastDate, currentDate);
            })
            .find((forecast) => forecast);

          const tasksForDate = tasks.filter((task) => {
            const taskDate = new Date(task.date);
            const adjustedTaskDate = new Date(
              taskDate.getUTCFullYear(),
              taskDate.getUTCMonth(),
              taskDate.getUTCDate()
            );
            const currentDate = new Date(date.toUTCString());

            return isSameDate(adjustedTaskDate, currentDate);
          });

          return (
            <DaySquare
              key={index}
              date={date}
              tasks={tasksForDate}
              forecast={forecastForDate}
            />
          );
        })}
      </div>
    </div>
  );
}

type ModeParams = {
  mode: Mode;
  calenderLength: number;
  focusDate: Date;
  startDate: Date;
  rowSize: number;
  fullMonthName: string;
};

const createModeParams = (mode: Mode, date: Date): ModeParams => {
  const firstOfMonth = changeDate(date, -date.getDate() + 1, "day");

  const firstOfWeek = changeDate(date, -date.getDay(), "day");

  const firstOnCalender = changeDate(
    firstOfMonth,
    -firstOfMonth.getDay(),
    "day"
  );

  return {
    mode,
    calenderLength: mode === "month" ? 35 : mode === "week" ? 7 : 1,
    focusDate: date,
    startDate:
      mode === "month" ? firstOnCalender : mode === "week" ? firstOfWeek : date,
    rowSize: mode === "day" ? 1 : 7,
    fullMonthName: date.toLocaleString("default", { month: "long" }),
  };
};
