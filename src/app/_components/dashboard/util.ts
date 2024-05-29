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
