import { Dispatch, SetStateAction } from "react";

type DateSelectorCellProps = {
  date: Date;
  setter: Dispatch<SetStateAction<Date>>;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
};
export const DateSelectorCell = (props: DateSelectorCellProps) => {
  const { date, setter, setShowDialog } = props;

  const setDate = () => {
    setter(date);
    setShowDialog(false);
  };

  const today = new Date();
  const isToday = date.toLocaleDateString() === today.toLocaleDateString();

  return (
    <div className={!isToday ? "ds-cell" : "ds-cell-today"} onClick={setDate}>
      {date.getDate()}
    </div>
  );
};
