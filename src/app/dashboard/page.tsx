"use server";

import BudgetOverview from "../../components/dashboard/budget/BudgetOverview";
import HomeTaskTable from "../../components/dashboard/home/HomeTaskTable";
import { getAllTasks } from "../../service/task/taskService";
import { Task } from "../../types";

export default async function DashboardPage() {
  const allTasksJson = await getAllTasks();
  const allTasks = (JSON.parse(allTasksJson) as Task[]).sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <div className="db-vert-grid">
      <div className="db-vert-grid-card-1">
        <HomeTaskTable tasks={allTasks} />
      </div>
      <div className="db-vert-grid-card-2">
        <BudgetOverview />
      </div>
    </div>
  );
}
