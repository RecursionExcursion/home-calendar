"use client";

import { useEffect, useRef } from "react";
import { Task } from "../../../types";
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
    <div className="task-list-container">
      <h3>Tasks</h3>
      <div ref={divAreaRef} className="task-area">
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

const TaskDiv = (props: TaskDivProps) => {
  const { task } = props;

  const { time } = getDateAndTime(new Date(task.date));

  const timeString = task.allDay ? "All Day" : time;

  return (
    <div className={`task-container-${task.priority}`}>
      <div className="task-item">{task.task}</div>
      <div className="task-item">{timeString}</div>
    </div>
  );
};
