"use server";

import { getBudget } from "../../api/budget/budgetService";
import { getAllTasks } from "../../api/task/taskService";
import BudgetOverview from "../../components/dashboard/budget/BudgetOverview";
import HomeTaskTable from "../../components/dashboard/home/HomeTaskTable";
import { computeBudget } from "../../service/budgetService";
import { Task } from "../../types";

export default async function DashboardPage() {
  const allTasksJson = await getAllTasks();
  const allTasks = (JSON.parse(allTasksJson) as Task[]).sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const budgetJSON = await getBudget();
  const computedBudget = await computeBudget(budgetJSON);
  const parsedBudget = JSON.stringify(computedBudget?.parsedBudget);

  return (
    <div className="greedyContainer">
      <div style={{ height: "50%" }}>
        <HomeTaskTable tasks={allTasks} />
      </div>
      <div className="rowContainer" style={{ height: "50%" }}>
        <BudgetOverview budgetJson={parsedBudget} />
      </div>
    </div>
  );
}
