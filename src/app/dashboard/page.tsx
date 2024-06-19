"use server";

import BudgetOverview from "../../components/dashboard/budget/BudgetOverview";
import HomeTaskTable from "../../components/dashboard/home/HomeTaskTable";
import { getAllTasks } from "../../task/taskService";
import { Task } from "../../types";

export default async function DashboardPage() {
  const allTasksJson = await getAllTasks();
  const allTasks = (JSON.parse(allTasksJson) as Task[]).sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <div className="greedy-container">
      <div className="h-50">
        <HomeTaskTable tasks={allTasks} />
      </div>
      <div className="row-container h-50" >
        <BudgetOverview />
      </div>
    </div>
  );
}
