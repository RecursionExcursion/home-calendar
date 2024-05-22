export type CalendarDate = {
  month: number;
  day: number;
  year: number;

  time: Time;
};

export type Time = {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
};
