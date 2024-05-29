import { createHash } from "node:crypto";

export function validateUTCDate(dateString: string): string {
  // Regular expression to check if the date string is in UTC format
  const utcRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

  if (!utcRegex.test(dateString)) {
    throw new Error(`Date string:${dateString} is not in UTC format`);
  }
  return dateString;
}

export const stripTimeFromDate = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

export const createSha256Hash = (input: string): string => {
  return createHash("sha256").update(input).digest("hex");
};

export const msTimestamps = {
  oneWeek: 1000 * 60 * 60 * 24 * 7,
  oneDay: 1000 * 60 * 60 * 24,
  oneHour: 1000 * 60 * 60,
  oneMinute: 1000 * 60,
  oneSecond: 1000,
};
