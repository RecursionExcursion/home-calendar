"use client";

import { Dispatch, SetStateAction, useState } from "react";
import DatePicker from "./datePicker/DatePicker";

export type DateState = {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
};

type DateRangePickerProps = {
  startDate: DateState;
  endDate: DateState;
};

const DateRangePicker = (props: DateRangePickerProps) => {
  const {
    startDate: { date: startDate, setDate: setStartDate },
    endDate: { date: endDate, setDate: setEndDate },
  } = props;

  return (
    <div className="date-pickers-container">
      <div className="start-date-wrapper">
        <DatePicker date={startDate} setDate={setStartDate} />
      </div>
      <div className="end-date-wrapper">
        <DatePicker date={endDate} setDate={setEndDate} />
      </div>
    </div>
  );
};
export default DateRangePicker;
