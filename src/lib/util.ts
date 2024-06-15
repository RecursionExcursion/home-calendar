import { createHash } from "crypto";

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

export const stripDateFromTime = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setFullYear(0, 0, 0);
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

export const roundToNextMultipleOf100 = (num: number) => {
  let remainder = num % 100;

  if (remainder === 0) {
    return num;
  }
  let difference = 100 - remainder;
  let roundedNumber = num + difference;
  return roundedNumber;
};

export const getTimeDifference = (epoch1: number, epoch2: number) => {
  const timeDifference = Math.abs(epoch1 - epoch2);

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  // Return the formatted string
  return `${days}D ${hours}H ${minutes}M ${seconds}S`;
};

export const normalizeString = (str: string) => {
  return str.toLowerCase();
};
