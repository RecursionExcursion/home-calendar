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

export const isSameDate = (date1: Date, date2: Date): boolean =>
  date1.getDate() === date2.getDate() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getFullYear() === date2.getFullYear();





      {/* {!initialMode && (
        <>
          <CustomButton onClick={() => setDate(new Date())} text="Today" />
          <div className="flex gap-8">
            <CustomButton onClick={() => setMode(Mode.Month)} text="Month" />
            <CustomButton onClick={() => setMode(Mode.Week)} text="Week" />
            <CustomButton onClick={() => setMode(Mode.Day)} text="Day" />
          </div>
        </>
      )} */}

        // const alterDate = (direction: ChangeDirection) => {
  //   const isNext = direction === "Next";

  //   const modeMap = new Map<Mode, () => void>([
  //     [Mode.Month, isNext ? goToNextMonth : goToLastMonth],
  //     [Mode.Week, isNext ? goToNextWeek : goToLastWeek],
  //     [Mode.Day, isNext ? goToTommorow : goToYesterday],
  //   ]);

  //   modeMap.get(mode)?.();
  // };

  // const goToNextWeek = () => setDate(changeDate(date, 1, "week"));
  // const goToLastWeek = () => setDate(changeDate(date, -1, "week"));

  // const goToTommorow = () => setDate(changeDate(date, 1, "day"));
  // const goToYesterday = () => setDate(changeDate(date, -1, "day"));

  // const goToNextMonth = () => setDate(changeDate(date, 1, "month"));
  // const goToLastMonth = () => setDate(changeDate(date, -1, "month"));

      {/* {!initialMode && (
        <>
          <div className="flex justify-between w-full px-10">
            <ChangeDateButton
              direction="Previous"
              handleClickCallBack={() => {
                alterDate("Previous");
              }}
            />
            <ChangeDateButton
              direction="Next"
              handleClickCallBack={() => {
                alterDate("Next");
              }}
            />
          </div>
        </>
      )} */}