import { Dispatch, SetStateAction } from "react";

type DateSelectorCellProps = {
  date: Date;
  setter: Dispatch<SetStateAction<Date>>;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  selectedDate: Date;
};

export const DateSelectorCell = (props: DateSelectorCellProps) => {
  const { date, setter, setShowDialog, selectedDate } = props;

  const setDate = () => {
    setter(date);
    setShowDialog(false);
  };

  const today = new Date();
  const isToday = date.toLocaleDateString() === today.toLocaleDateString();
  const isSelected =
    date.toLocaleDateString() === selectedDate.toLocaleDateString();

  const containerStyle = isSelected
    ? "ds-cell-selected"
    : isToday
    ? "ds-cell-today"
    : "ds-cell";

  return (
    <div className={containerStyle} onClick={setDate}>
      {date.getDate()}
    </div>
  );
};
