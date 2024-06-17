"use client";

import { useEffect, useState } from "react";
import DateSelector from "./DateSelector";

//TODO Move to iconservice
import { FaCalendar } from "react-icons/fa6";

type DatePickerProps = {
  date: Date;
  setDate?: (date: Date) => void;
};

export default function DatePicker(props: DatePickerProps) {
  const { date, setDate } = props;

  const [thisDate, setThisDate] = useState(date);

  const [inputDate, setInputDate] = useState({
    month: thisDate.getMonth() + 1,
    day: thisDate.getDate(),
    year: thisDate.getFullYear(),
  });

  const [dateIsValid, setDateIsValid] = useState(true);

  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    setInputDate({
      month: thisDate.getMonth() + 1,
      day: thisDate.getDate(),
      year: thisDate.getFullYear(),
    });
  }, [thisDate]);

  useEffect(() => {
    const newDate = new Date(inputDate.year, inputDate.month - 1, inputDate.day);

    const monthsAreEqual = newDate.getMonth() === inputDate.month - 1;
    const daysAreEqual = newDate.getDate() == inputDate.day;
    const yearsAreEqual = newDate.getFullYear() === inputDate.year;
    const datesAreEqual = monthsAreEqual && daysAreEqual && yearsAreEqual;

    setDateIsValid(datesAreEqual);

    if (datesAreEqual) {
      if (setDate) {
        // setThisDate(newDate);
        setDate(newDate);
      }
    }
  }, [inputDate]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let returnValue: number | "" = parseInt(value);

    const isNumber = /^\d+$/.test(value);
    const isEmpty = value === "";

    const isNumberOrEmpty = isEmpty || isNumber;

    if (!isNumberOrEmpty) return;

    const validityMap: Record<string, () => boolean> = {
      month: () => !(value.split("").length > 2),
      day: () => !(value.split("").length > 2),
      year: () => !(value.split("").length > 4),
    };

    const isValid = validityMap[name as keyof typeof validityMap]();
    if (!isValid) return;

    setInputDate((prev) => ({
      ...prev,
      [name]: isEmpty ? "" : returnValue,
    }));
  };

  return (
    <div>
      <div className="row-container gap-1">
        <div className={dateIsValid ? "dp-wrapper" : "dp-wrapper-invalid"}>
          <input
            name="month"
            className={"dp-input"}
            type="text"
            value={inputDate.month}
            onChange={handleDateChange}
          />
          /
          <input
            name="day"
            className={"dp-input"}
            type="text"
            value={inputDate.day}
            onChange={handleDateChange}
          />
          /
          <input
            name="year"
            className={"dp-input-year"}
            type="text"
            value={inputDate.year}
            onChange={handleDateChange}
          />
          <button
            className="dp-button"
            onClick={() => {
              setShowDialog(!showDialog);
            }}
          >
            <FaCalendar />
          </button>
        </div>
        <dialog className="ds-dialog" open={showDialog}>
          <DateSelector setParentDate={setThisDate} setShowDialog={setShowDialog} />
        </dialog>
      </div>
    </div>
  );
}
