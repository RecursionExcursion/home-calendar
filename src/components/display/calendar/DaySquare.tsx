"use client";

import { CSSProperties } from "react";

import ForecastBar from "./ForecastBar";
import { TaskList } from "./TaskList";
import { useDisplayContext } from "../../../contexts";
import { isSameDate, sortTasks } from "../../../util";
import { colors } from "../../../styles/colors";


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

  //TODO clean up styles
  const baseStyle: CSSProperties = {
    height: "10rem",
    display: "flex",
    flexDirection: "column",
    border: "1px solid white",
    borderCollapse: "collapse",
  };
  const styleColors = {
    blue: { backgroundColor: colors.daySquare.blue },
    black: { backgroundColor: colors.black },
    green: { backgroundColor: colors.daySquare.green },
  };

  const wrapperStyle: CSSProperties = (() => {
    let style = sortedTasks.length > 0 ? styleColors.green : styleColors.black;
    style = !isSameDate(date, currentDate) ? style : styleColors.blue;
    return { ...baseStyle, ...style };
  })();

  return (
    <div style={wrapperStyle}>
      <div
        style={{
          display: "flex",
          height: "20%",
          outline: "1px solid white",
        }}
      >
        <div
          className="row-container"
          style={{
            padding: "0 0.5rem",
            outline: "1px solid white",
            width: "1rem",
            height: "100%",
            borderCollapse: "collapse",
          }}
        >
          {day}
        </div>
        <ForecastBar forecast={forecastForDate} />
      </div>
      <div style={{ height: "80%" }}>
        {sortedTasks.length > 0 && <TaskList tasks={sortedTasks} />}
      </div>
    </div>
  );
}
