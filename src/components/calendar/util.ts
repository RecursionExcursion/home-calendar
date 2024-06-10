import { Mode } from "fs";
import { Task } from "../../types/task";

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
