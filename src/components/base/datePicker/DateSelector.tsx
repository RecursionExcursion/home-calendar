"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { changeDate, getFirstOnCalender, getFullMonthName } from "../../../util";

type DateSelectorProps = {
  setParentDate: Dispatch<SetStateAction<Date>>;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
};

export default function DateSelector(props: DateSelectorProps) {
  const { setParentDate, setShowDialog } = props;

  const [date, setDate] = useState(new Date());
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

type DateSelectorCellProps = {
  date: Date;
  setter: Dispatch<SetStateAction<Date>>;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
};
const DateSelectorCell = (props: DateSelectorCellProps) => {
  const { date, setter, setShowDialog } = props;

  const setDate = () => {
    setter(date);
    setShowDialog(false);
  };

  const today = new Date();
  const isToday = date.toLocaleDateString() === today.toLocaleDateString();

  return (
    <div className={!isToday ? "ds-cell" : "ds-cell-today"} onClick={setDate}
    // onMouseOver={}
    >
      {date.getDate()}
    </div>
  );
};

type MonthSelectorButtonProps = {
  dir: "back" | "forward";
  onClick: () => void;
};

const MonthSelectorButton = (props: MonthSelectorButtonProps) => {
  const { dir, onClick } = props;

  const text = dir === "back" ? "<" : ">";

  return (
    <button className="ds-month-button" onClick={onClick}>
      {text}
    </button>
  );
};
