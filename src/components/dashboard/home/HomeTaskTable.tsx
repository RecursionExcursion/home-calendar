"use client";

import { FaTrash } from "react-icons/fa";
import { Task, Tasks } from "../../../types";
import { useEffect, useState } from "react";
import { useDashboardContext, useUserContext } from "../../../contexts";
import { deleteTask } from "../../../service/taskService";
import { getTasks } from "../../../service/tasksService";
import { useAppLoadingContext } from "../../../contexts/AppLoadingContext";


type HomeTaskTableProps = {
  tasks: Task[];
};

export default function HomeTaskTable(props: HomeTaskTableProps) {
  const { tasks: propTasks } = props;
  const { user } = useUserContext();
  const { showToast } = useDashboardContext();
  const { setAppLoading } = useAppLoadingContext();

  const [tasks, setTasks] = useState<Task[]>(propTasks);

  const totalTasks = tasks.length;
  const overdueTasks = tasks.filter((task) => new Date(task.date) < new Date()).length;

  useEffect(() => {
    setTasks(propTasks);
  }, [propTasks]);

  const handleDeleteTaskClick = async (id: string) => {
    setAppLoading(true);
    const res = await deleteTask(id, user._id.toString());

    if (res) {
      showToast({
        title: "Success",
        message: "Task deleted",
        type: "success",
      });
      getTasks(user._id.toString()).then((tasks) => {
        const castedTasks = JSON.parse(tasks) as Tasks;
        setTasks(castedTasks.taskList);
      });
    } else {
      showToast({
        title: "Error",
        message: "Task could not be deleted",
        type: "error",
      });
    }
    setAppLoading(false);
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
        <table className="basic-border full">
          <tbody>
            {tasks.map((task, i) => {
              const key = i + task?.id?.toString();

              const taskDate = new Date(task.date);

              const displayDate = new Date(task.date).toLocaleDateString();

              const dateStyle =
                taskDate < new Date()
                  ? "db-task-table-table-td-date-past"
                  : "db-task-table-table-td-date";

              return (
                <tr className="db-task-table-table-tr" key={key}>
                  <td className="db-task-table-table-td-desc">{task.description} </td>
                  <td className={dateStyle}>{displayDate}</td>
                  <td className="db-task-table-table-td-delete">
                    <button onClick={() => handleDeleteTaskClick(task.id.toString())}>
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
