"use client";

import { useEffect, useRef, useState } from "react";
import { Task } from "../../_types/models/task";
import { getDateAndTime } from "../dashboard/util";

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

    const scrollTill =
      divAreaRef.current.scrollHeight - divHeight + bottomhangTime;

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
    <div className="  text-black flex flex-col items-center rounded-lg w-full h-full overflow-hidden p-2">
      <h3 className="flex justify-center font-semibold text-lg bg-slate-300 w-full rounded-md rounded-b-none">
        Tasks
      </h3>
      <div
        ref={divAreaRef}
        className="w-full h-full resize-none overflow-hidden rounded-md rounded-t-none bg-white"
        style={{ scrollBehavior: "smooth" }}
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
  [0, "bg-white"],
  [1, "bg-green-500"],
  [2, "bg-yellow-500"],
  [3, "bg-red-500"],
]);

const TaskDiv = (props: TaskDivProps) => {
  const { task } = props;

  const { time } = getDateAndTime(new Date(task.date));

  const color = priorityColorsMap.get(task.priority);

  const wrapperStyle = `flex text-nowrap ${color}`;

  const timeString = task.allDay ? "All Day" : time;

  return (
    <div className={wrapperStyle}>
      <div className="flex flex-1 justify-center">{task.task}</div>
      <div className="flex flex-1 justify-center">{timeString}</div>
    </div>
  );
};
