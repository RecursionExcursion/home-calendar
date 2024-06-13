"use client";

import { CSSProperties, useEffect, useRef } from "react";
import { Task } from "../../../types";
import { colors } from "../../../styles/colors";
import { getDateAndTime } from "../../../util";


type TaskListProps = {
  tasks: Task[];
};
export const TaskList = (props: TaskListProps) => {
  const { tasks } = props;

  const scrollSpeed = 250; //ms
  const bottomhangTime = 10; //hang + scrollSpeed = time it will stay at the bottom before resetting

  const divAreaRef = useRef<HTMLDivElement>(null);
  const scrollIndexRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scroll = async () => {
    if (divAreaRef.current === null) {
      throw new Error("ref is undefined");
    }

    const divHeight = divAreaRef.current.clientHeight;
    const scrollHeight = divAreaRef.current.scrollHeight;

    if (divHeight >= scrollHeight) return; //Kicks out if the div is not overflowing

    const scrollTill = divAreaRef.current.scrollHeight - divHeight + bottomhangTime;

    timeoutRef.current = setTimeout(() => {
      divAreaRef.current?.scrollTo({
        top: scrollIndexRef.current + 1,
        behavior: "smooth",
      });
      scrollIndexRef.current =
        scrollIndexRef.current === scrollTill ? 0 : scrollIndexRef.current + 1;
      scroll(); //Will recursively scroll until the component is unmounted
    }, scrollSpeed);
  };

  useEffect(() => {
    scroll();
    //clean up
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className="colContainer"
      style={{
        borderRadius: "0.5rem",
        color: colors.black,
        gap: "0rem",
        height: "85%",
        overflow: "hidden",
        padding: "0.5rem",
      }}
    >
      <h3
        style={{
          backgroundColor: colors.slate300,
          borderRadius: "0.5rem 0.5rem 0 0",
          display: "flex",
          fontSize: "1.125rem",
          fontWeight: 600,
          justifyContent: "center",
          lineHeight: "1.75rem",
          width: "100%",
        }}
      >
        Tasks
      </h3>
      <div
        ref={divAreaRef}
        style={{
          backgroundColor: colors.white,
          borderRadius: "0 0 0.5rem 0.5rem",
          overflow: "hidden",
          resize: "none",
          scrollBehavior: "smooth",
          height: "100%",
          width: "100%",
        }}
      >
        {tasks.map((t) => (
          <TaskDiv key={t._id.toString()} task={t} />
        ))}
      </div>
    </div>
  );
};

type TaskDivProps = {
  task: Task;
};

const priorityColorsMap = new Map<number, string>([
  [0, colors.white],
  [1, colors.prioirtyColors.good],
  [2, colors.prioirtyColors.warning],
  [3, colors.prioirtyColors.danger],
]);

const TaskDiv = (props: TaskDivProps) => {
  const { task } = props;

  const { time } = getDateAndTime(new Date(task.date));

  const timeString = task.allDay ? "All Day" : time;

  const divStyle: CSSProperties = {
    width: "50%",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        textWrap: "nowrap",
        backgroundColor: priorityColorsMap.get(task.priority),
      }}
    >
      <div style={divStyle}>{task.task}</div>
      <div style={divStyle}>{timeString}</div>
    </div>
  );
};
