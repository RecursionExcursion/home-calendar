"use client";

import ForecastBar from "./ForecastBar";
import { TaskList } from "./TaskList";
import { useDisplayContext } from "../../../contexts";
import { isSameDate, sortTasks } from "../../../util";

type DaySquareProps = {
  date: Date;
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

  const getWrapperClass = () => {
    const normal = "calendar-grid-cell";
    const today = "calendar-grid-cell-today";
    const task = "calendar-grid-cell-task";

    let style = sortedTasks.length > 0 ? task : normal;
    style = !isSameDate(date, currentDate) ? style : today;
    return style;
  };

  return (
    <div className={getWrapperClass()}>
      <div className="grid-banner">
        <div className="grid-banner-content-wrapper">{day}</div>
        <ForecastBar forecast={forecastForDate} />
      </div>
      <div className="task-section">
        {sortedTasks.length > 0 && <TaskList tasks={sortedTasks} />}
      </div>
    </div>
  );
}
