"use client";

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import DateSelector from "./DateSelector";

//TODO Move to icon service
import { FaCalendar } from "react-icons/fa6";
import { useAppContext } from "../../../contexts";

type DatePickerProps = {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  setValidityFlag?: Dispatch<SetStateAction<boolean>>;
  onlyModal?: boolean;
};

export default function DatePicker(props: DatePickerProps) {
  const {
    date: initalDate,
    setDate: setParentDate,
    setValidityFlag,
    onlyModal = false,
  } = props;

  const { showModal, closeModal } = useAppContext();

  const [date, setDate] = useState(initalDate);

  const [inputDate, setInputDate] = useState({
    month: date.getMonth() + 1,
    day: date.getDate(),
    year: date.getFullYear(),
  });

  const [dateIsValid, setDateIsValid] = useState(true);

  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    setInputDate({
      month: date.getMonth() + 1,
      day: date.getDate(),
      year: date.getFullYear(),
    });
  }, [date]);

  useEffect(() => {
    const newDate = new Date(
      inputDate.year,
      inputDate.month - 1,
      inputDate.day
    );

    const monthsAreEqual = newDate.getMonth() === inputDate.month - 1;
    const daysAreEqual = newDate.getDate() == inputDate.day;
    const yearsAreEqual = newDate.getFullYear() === inputDate.year;
    const datesAreEqual = monthsAreEqual && daysAreEqual && yearsAreEqual;

    setDateIsValid(datesAreEqual);

    if (datesAreEqual) {
      if (setParentDate) {
        setParentDate(newDate);
      }
    }
    if (setValidityFlag) {
      setValidityFlag(datesAreEqual);
    }
  }, [inputDate]);

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  useEffect(() => {
    if (showDialog) {
      showModal(
        <DateSelector
          date={date}
          setParentDate={setDate}
          setShowDialog={setShowDialog}
        />
      );
    } else {
      closeModal();
    }
  }, [showDialog]);

  return onlyModal ? (
    <button className="dp-button" onClick={() => setShowDialog(!showDialog)}>
      <FaCalendar />
    </button>
  ) : (
    <div>
      <div className="flex gap-1">
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
            className="dp-button-black"
            onClick={() => setShowDialog(!showDialog)}
          >
            <FaCalendar />
          </button>
        </div>
      </div>
    </div>
  );
}
