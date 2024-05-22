type ChangeType = "day" | "week" | "month" | "year";

export const changeDate = (
  date: Date,
  amount: number,
  change: ChangeType
): Date => {
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
