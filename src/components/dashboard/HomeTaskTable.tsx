"use client";

import { FaTrash } from "react-icons/fa";
import { Button, H2 } from "../base";
import { Task } from "../../types";
import { colors } from "../../styles/colors";
import { CSSProperties, useState } from "react";
import { deleteTask, getAllTasks } from "../../api/service/taskService";
import { useAppContext } from "../../contexts";

type HomeTaskTableProps = {
  tasks: Task[];
};

export default function HomeTaskTable(props: HomeTaskTableProps) {
  const { tasks: propTasks } = props;
  const { showToast } = useAppContext();

  const [tasks, setTasks] = useState<Task[]>(propTasks);

  const totalTasks = tasks.length;
  const overdueTasks = tasks.filter((task) => new Date(task.date) < new Date()).length;

  const handleDeleteTaskClick = async (id: string) => {
    const res = await deleteTask(id);

    if (res.deletedCount === 1) {
      showToast({
        title: "Success",
        message: "Task deleted",
        type: "success",
      });
      getAllTasks().then((tasks) => {
        const castedTasks = JSON.parse(tasks) as Task[];
        setTasks(castedTasks);
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
        height: "100%",
        width: "100%",
        gap: "1rem",
      }}
    >
      <H2>HomeTaskTable</H2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          textDecoration: "underline",
          width: "80%",
        }}
      >
        <div>
          <span>Total: </span>
          <span>{`${totalTasks}`}</span>
        </div>
        <div>
          <span>Overdue: </span>
          <span style={{ color: colors.prioirtyColors.danger }}>{`${overdueTasks}`}</span>
        </div>
      </div>

      <div style={{ height: "60%", overflowY: "auto", width: "80%" }}>
        <table
          style={{
            border: `1px solid ${colors.white}`,
            borderCollapse: "collapse",
            width: "100%",
          }}
        >
          <tbody>
            {tasks.map((task, i) => {
              const key = i + task?._id?.toString();

              const taskDate = new Date(task.date);

              const dateStyle: CSSProperties = {
                color:
                  taskDate < new Date() ? colors.prioirtyColors.danger : colors.white,
              };

              const displayDate = new Date(task.date).toLocaleDateString();

              const tdStyle: CSSProperties = { textAlign: "center" };

              return (
                <tr
                  key={key}
                  style={{
                    border: `1px solid ${colors.white}`,
                    borderCollapse: "collapse",
                  }}
                >
                  <td style={tdStyle}>{task.task}</td>
                  <td style={{ ...dateStyle, ...tdStyle }}>{displayDate}</td>
                  <td style={tdStyle}>
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
