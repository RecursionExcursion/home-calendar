"use client";

import { FaTrash } from "react-icons/fa";
import { Button, H2 } from "../base";
import { Task } from "../../types";
import { colors } from "../../styles/colors";
import { CSSProperties } from "react";
import { deleteTask } from "../../api/service/taskService";
import { useAppContext } from "../../contexts";

type HomeTaskTableProps = {
  tasks: Task[];
};

export default function HomeTaskTable(props: HomeTaskTableProps) {
  const { tasks } = props;
  const { showToast } = useAppContext();

  //TODO: Implement state management for tasks and delete task

  const handleDeleteTaskClick = async (id: string) => {
    const res = await deleteTask(id);
    console.log({ res });

    if (res.deletedCount === 1) {
      showToast({
        title: "Success",
        message: "Task deleted",
        type: "success",
      });
    } else {
      showToast({
        title: "Error",
        message: "Task could not be deleted",
        type: "error",
      });
    }
  };

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        height: "80%",
      }}
    >
      <H2>HomeTaskTable</H2>
      <div
        style={{
          height: "80%",
          overflowY: "auto",
          padding: "1rem",
        }}
      >
        <table>
          <tbody>
            {tasks.map((task, i) => {
              const key = i + task?._id?.toString();

              const taskDate = new Date(task.date);

              const dateStyle: CSSProperties = {
                color:
                  taskDate < new Date() ? colors.prioirtyColors.danger : colors.white,
              };

              const displayDate = new Date(task.date).toLocaleDateString();

              return (
                <tr key={key}>
                  <td>{task.task}</td>
                  <td style={dateStyle}>{displayDate}</td>
                  <td>
                    <Button
                      child={<FaTrash />}
                      theme="none"
                      onClick={() => handleDeleteTaskClick(task._id.toString())}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
