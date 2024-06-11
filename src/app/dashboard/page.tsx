"use server";

import { getAllTasks } from "../../api/service/taskService";
import HomeTaskTable from "../../components/dashboard/HomeTaskTable";
import { Task } from "../../types";

export default async function DashboardPage() {
  const allTasksJson = await getAllTasks();
  let allTasks = JSON.parse(allTasksJson) as Task[];

  allTasks = allTasks.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return <HomeTaskTable tasks={allTasks} />;
}
