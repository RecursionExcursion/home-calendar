export enum Days {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export const monthMap = new Map<number, string>([
  [1, "January"],
  [2, "February"],
  [3, "March"],
  [4, "April"],
  [5, "May"],
  [6, "June"],
  [7, "July"],
  [8, "August"],
  [9, "September"],
  [10, "October"],
  [11, "November"],
  [12, "Decemeber"],
]);

export const getDaysInMonth = (month: number, year: number): number => {
  return new Date(year, month, 0).getDate();
};

export const getDay = (date: Date): string => {
  return Days[date.getDay()];
};
