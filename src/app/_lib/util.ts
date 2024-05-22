export function validateUTCDate(dateString: string): string {
  // Regular expression to check if the date string is in UTC format
  const utcRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

  if (!utcRegex.test(dateString)) {
    throw new Error(`Date string:${dateString} is not in UTC format`);
  }
  return dateString;
}
