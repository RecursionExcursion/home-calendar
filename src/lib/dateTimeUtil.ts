import { Task } from "../types";

export const areDatesLessThanXDaysApart = (
  date1: Date,
  date2: Date,
  daysApart: number
) => {
  // Get the time difference in milliseconds
  const timeDifference = Math.abs(date1.getTime() - date2.getTime());

  // Convert the time difference from milliseconds to days
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  // Check if the difference is more than 6 days
  return daysDifference < daysApart;
};

export type DateAndTime = {
  date: string;
  time: string;
};

export const getDateAndTime = (dateInput: Date): DateAndTime => {
  const year = dateInput.getFullYear();
  const month = (dateInput.getMonth() + 1).toString().padStart(2, "0");
  const day = dateInput.getDate().toString().padStart(2, "0");

  const date = `${year}-${month}-${day}`;
  const time = `${dateInput.getHours()}:${dateInput
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  return {
    date: date,
    time: time,
  };
};

export const dateAndTimeToDate = (dateAndTime: DateAndTime) => {
  const { date, time } = dateAndTime;

  const newDate = new Date(`${date}T${time}:00`);

  return newDate;
};

type ChangeType = "day" | "week" | "month" | "year";

export const changeDate = (date: Date, amount: number, change: ChangeType): Date => {
  const newDate = new Date(date);

  const map = new Map<ChangeType, (date: Date, amount: number) => void>([
    ["day", (date, amount) => date.setDate(date.getDate() + amount)],
    ["week", (date, amount) => date.setDate(date.getDate() + amount * 7)],
    ["month", (date, amount) => date.setMonth(date.getMonth() + amount)],
    ["year", (date, amount) => date.setFullYear(date.getFullYear() + amount)],
  ]);

  map.get(change)?.(newDate, amount);

  return newDate;
};

export const isSameDate = (date1: Date, date2: Date): boolean =>
  date1.getDate() === date2.getDate() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getFullYear() === date2.getFullYear();

export const sortTasks = (tasks: Task[]) => {
  let allDayTasks = tasks.filter((t) => t.allDay);
  let nonAllDayTasks = tasks.filter((t) => !t.allDay);

  allDayTasks = allDayTasks.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  nonAllDayTasks = nonAllDayTasks.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return [...allDayTasks, ...nonAllDayTasks];
};

export const getFirstOfMonth = (date: Date): Date => {
  return changeDate(date, -date.getDate() + 1, "day");
};

export const getFirstOfWeek = (date: Date): Date => {
  return changeDate(date, -date.getDay(), "day");
};

export const getFirstOnCalender = (date: Date): Date => {
  return changeDate(getFirstOfMonth(date), -getFirstOfMonth(date).getDay(), "day");
};

export const getFullMonthName = (date: Date): string => {
  return date.toLocaleString("default", { month: "long" });
};
