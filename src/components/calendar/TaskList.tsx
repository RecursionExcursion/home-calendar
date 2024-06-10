"use client";

import { CSSProperties, useEffect, useRef } from "react";
import { Task } from "../../types/task";
import { getDateAndTime } from "../dashboard/util";
import { colors } from "../../styles/colors";

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
      style={{
        height: "85%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "0.5rem",
        padding: "0.5rem",
        overflow: "hidden",
        color: colors.black,
      }}
    >
      <h3
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          fontWeight: 600,
          fontSize: "1.125rem",
          lineHeight: "1.75rem",
          backgroundColor: colors.slate300,
          borderRadius: "0.5rem 0.5rem 0 0",
        }}
      >
        Tasks
      </h3>
      <div
        ref={divAreaRef}
        style={{
          width: "100%",
          height: "100%",
          resize: "none",
          overflow: "hidden",
          borderRadius: "0 0 0.5rem 0.5rem",
          backgroundColor: colors.white,
          scrollBehavior: "smooth",
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
