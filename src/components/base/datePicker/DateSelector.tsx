"use client";

import { Dispatch, SetStateAction, useState } from "react";
import {
  changeDate,
  getFirstOnCalender,
  getFullMonthName,
} from "../../../lib/dateTimeUtil";
import { DateSelectorCell } from "./DateSelectorCell";
import { MonthSelectorButton } from "./MonthSelectorButton";

type DateSelectorProps = {
  setParentDate: Dispatch<SetStateAction<Date>>;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  date: Date;
};

export default function DateSelector(props: DateSelectorProps) {
  const { setParentDate, setShowDialog, date: dateProp } = props;

  const [date, setDate] = useState(dateProp);
  const monthName = `${getFullMonthName(date)} ${date.getFullYear()}`;

  const firstOnCalender = getFirstOnCalender(date);

  const generateDaySquares = (date: Date): JSX.Element[] => {
    const calendarLength = 35;
    const calenderStartDate = firstOnCalender;

    return Array.from({ length: calendarLength }).map((_, i) => {
      const date = changeDate(calenderStartDate, i, "day");
      return (
        <DateSelectorCell
          key={i}
          date={date}
          selectedDate={dateProp}
          setter={setParentDate}
          setShowDialog={setShowDialog}
        />
      );
    });
  };

  return (
    <div className="ds-wrapper">
      <div className="ds-control-container">
        <button onClick={() => setDate(new Date())}>Reset</button>
        <button onClick={() => setShowDialog(false)}>X</button>
      </div>
      <div className="ds-month-container">
        <MonthSelectorButton
          dir="back"
          onClick={() => setDate(changeDate(date, -1, "month"))}
        />
        <h3>{monthName}</h3>
        <MonthSelectorButton
          dir="forward"
          onClick={() => setDate(changeDate(date, 1, "month"))}
        />
      </div>
      <div className="ds-grid">{generateDaySquares(date)}</div>
    </div>
  );
}
