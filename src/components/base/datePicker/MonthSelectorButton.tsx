type MonthSelectorButtonProps = {
  dir: "back" | "forward";
  onClick: () => void;
};

export const MonthSelectorButton = (props: MonthSelectorButtonProps) => {
  const { dir, onClick } = props;

  const text = dir === "back" ? "<" : ">";

  return (
    <button className="ds-month-button" onClick={onClick}>
      {text}
    </button>
  );
};
