import { DailyForecast } from "../../_types/display/weather";
import { Task } from "../../_types/models/task";
import ForecastBar from "./ForecastBar";
import { TaskList } from "./TaskList";
import { isSameDate } from "./util";

type DaySquareProps = {
  date: Date;
  tasks: Task[];
  forecast: DailyForecast | undefined;
};

const baseStyle = `h-full w-full border border-white flex flex-col `;

const styles = {
  blue: baseStyle + "bg-blue-500",
  black: baseStyle + "bg-black",
  green: baseStyle + "bg-green-500",
};

export default function DaySquare(props: DaySquareProps) {
  const { date, tasks, forecast } = props;

  const currentDate = new Date();

  const wrapperStyle: string = (() => {
    let style = tasks.length > 0 ? styles.green : styles.black;
    style = !isSameDate(date, currentDate) ? style : styles.blue;
    return style;
  })();

  const day = date.getDate();

  return (
    <div className={wrapperStyle}>
      <div className="flex h-7">
        <div className="flex-2 px-2 border border-white border-t-0 border-l-0">
          {day}
        </div>
        <div className="flex-1 px-2 border-b border-white">
          <ForecastBar forecast={forecast} />
        </div>
      </div>
      {tasks.length > 0 && <TaskList tasks={tasks} />}
    </div>
  );
}
