"use client";

import { useEffect, useState } from "react";

type DatePickerProps = {
  date: Date;
  setDate?: (date: Date) => void;
};

export default function DatePicker(props: DatePickerProps) {
  const { date, setDate } = props;

  const [inputDate, setInputDate] = useState({
    month: date.getMonth() + 1,
    day: date.getDate(),
    year: date.getFullYear(),
  });

  const [dateIsValid, setDateIsValid] = useState(true);

  useEffect(() => {
    const newDate = new Date(inputDate.year, inputDate.month - 1, inputDate.day);

    const monthsAreEqual = newDate.getMonth() === inputDate.month - 1;
    const daysAreEqual = newDate.getDate() == inputDate.day;
    const yearsAreEqual = newDate.getFullYear() === inputDate.year;
    const datesAreEqual = monthsAreEqual && daysAreEqual && yearsAreEqual;

    setDateIsValid(datesAreEqual);

    if (datesAreEqual) {
      if (setDate) {
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
      </div>
    </div>
  );
}
