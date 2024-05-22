"use client";

import { use, useEffect, useState } from "react";
import DaySquare from "./DaySquare";
import DaysOfWeekCalenderHeader from "./DaysOfWeekCalenderHeader";
import ChangeDateButton, { ChangeDirection } from "./ChangeDateButton";
import { changeDate } from "./util";
import CustomButton from "../ui/CustomButton";

export default function Calendar() {
  const [date, setDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<Mode>("month");

  const [modeParams, setModeParams] = useState<ModeParams>(
    createModeParams(mode, date)
  );

  useEffect(() => {
    setModeParams(createModeParams(mode, date));
  }, [mode, date]);

  const gridStyle = {
    one: "border border-white grid grid-cols-1",
    seven: "border border-white grid grid-cols-7",
  };

  const gridStyleValue =
    modeParams.rowSize === 1 ? gridStyle.one : gridStyle.seven;

  const alterDate = (direction: ChangeDirection) => {
    if (mode === "month") {
      setDate(changeDate(date, direction === "Next" ? 1 : -1, "month"));
    } else if (mode === "week") {
      setDate(changeDate(date, direction === "Next" ? 7 : -7, "day"));
    } else {
      setDate(changeDate(date, direction === "Next" ? 1 : -1, "day"));
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1>{`${modeParams.fullMonthName} ${date.getFullYear()}`}</h1>
      <button onClick={() => setDate(new Date())}>Today</button>
      <div className="flex gap-8">
        <CustomButton onClick={() => setMode("month")} text="Month" />
        <CustomButton onClick={() => setMode("week")} text="Week" />
        <CustomButton onClick={() => setMode("day")} text="Day" />
      </div>

      <div className={gridStyleValue}>
        <DaysOfWeekCalenderHeader mode={mode} dayOfWeek={date.getDay()} />
        {Array.from({ length: modeParams.calenderLength }).map((_, index) => (
          <div key={index} className="border border-white">
            <DaySquare date={changeDate(modeParams.startDate, index, "day")} />
          </div>
        ))}
      </div>
      <div className="flex justify-between w-full px-10">
        <ChangeDateButton
          direction="Previous"
          handleClickCallBack={() => {
            alterDate("Previous");
          }}
        />
        <ChangeDateButton
          direction="Next"
          handleClickCallBack={() => {
            alterDate("Next");
          }}
        />
      </div>
    </div>
  );
}

type Mode = "month" | "week" | "day";

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
