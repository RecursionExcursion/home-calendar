"use client";

import { useDisplayContext } from "../../contexts/DisplayContext";
import ForecastBar from "./ForecastBar";
import { TaskList } from "./TaskList";
import { isSameDate, sortTasks } from "./util";


type DaySquareProps = {
  date: Date;
};

const baseStyle = `h-40 w-full border border-white flex flex-col `;

const styles = {
  blue: baseStyle + "bg-blue-500",
  black: baseStyle + "bg-black",
  green: baseStyle + "bg-green-500",
};

export default function DaySquare(props: DaySquareProps) {
  const { forecast, tasks } = useDisplayContext();
  const { date } = props;

  const forecastForDate = forecast
    .filter((forecast) => {
      const forecastDate = new Date(forecast.date);
      const adjustedForecastDate = new Date(
        forecastDate.getUTCFullYear(),
        forecastDate.getUTCMonth(),
        forecastDate.getUTCDate()
      );
      const currentDate = new Date(date.toUTCString());

      return isSameDate(adjustedForecastDate, currentDate);
    })
    .find((forecast) => forecast);

  const tasksForDate = tasks.filter((task) => {
    const taskDate = new Date(task.date);
    const adjustedTaskDate = new Date(
      taskDate.getUTCFullYear(),
      taskDate.getUTCMonth(),
      taskDate.getUTCDate()
    );
    const currentDate = new Date(date.toUTCString());

    return isSameDate(adjustedTaskDate, currentDate);
  });

  const currentDate = new Date();

  const day = date.getDate();

  const sortedTasks = sortTasks(tasksForDate);

  const wrapperStyle: string = (() => {
    let style = sortedTasks.length > 0 ? styles.green : styles.black;
    style = !isSameDate(date, currentDate) ? style : styles.blue;
    return style;
  })();

  return (
    <div className={wrapperStyle}>
      <div className="flex h-7">
        <div className="flex-2 px-2 border border-white border-t-0 border-l-0">
          {day}
        </div>
        <div className="flex-1 border-b border-white">
          <ForecastBar forecast={forecastForDate} />
        </div>
      </div>
      {sortedTasks.length > 0 && <TaskList tasks={sortedTasks} />}
    </div>
  );
}
