"use client";

import { FaTrash } from "react-icons/fa";
import { Task } from "../../../types";
import {  useState } from "react";
import { deleteTask, getAllTasks } from "../../../task/taskService";
import { useDashboardContext } from "../../../contexts";

type HomeTaskTableProps = {
  tasks: Task[];
};

export default function HomeTaskTable(props: HomeTaskTableProps) {
  const { tasks: propTasks } = props;
  const { showToast } = useDashboardContext();

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
    <div className="db-task-table-container">
      <h2 className="db-h2">Tasks</h2>

      <div className="db-task-table-info-header w-80">
        <div>
          <span>Total: </span>
          <span>{`${totalTasks}`}</span>
        </div>
        <div>
          <span>Overdue: </span>
          <span className="db-overdue-span">{`${overdueTasks}`}</span>
        </div>
      </div>

      <div className="db-task-table-table-container w-95">
        <table className="basic-border greedy-container">
          <tbody>
            {tasks.map((task, i) => {
              const key = i + task?._id?.toString();

              const taskDate = new Date(task.date);

              const displayDate = new Date(task.date).toLocaleDateString();

              const dateStyle =
                taskDate < new Date()
                  ? "db-task-table-table-td-date-past"
                  : "db-task-table-table-td-date";

              return (
                <tr className="db-task-table-table-tr" key={key}>
                  <td className="db-task-table-table-td-desc">{task.task} </td>
                  <td className={dateStyle}>{displayDate}</td>
                  <td className="db-task-table-table-td-delete">
                    <button onClick={() => handleDeleteTaskClick(task._id.toString())}>
                      <FaTrash />
                    </button>
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
