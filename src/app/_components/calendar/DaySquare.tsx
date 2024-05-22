type DaySquareProps = {
  date: Date;
};

export default function DaySquare(props: DaySquareProps) {
  const { date } = props;

  const currentDate = new Date();

  const styles = {
    gray: "bg-gray-500 p-10",
    black: "bg-black p-10",
  };

  const isToday =
    date.getDate() === currentDate.getDate() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear();

  const style = !isToday ? styles.black : styles.gray;

  const day = date.getDate();

  return (
    <div className={style}>
      <div>{day}</div>
    </div>
  );
}
