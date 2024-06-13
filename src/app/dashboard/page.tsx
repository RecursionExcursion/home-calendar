"use server";

import { getBudget } from "../../api/budget/budgetService";
import { getAllTasks } from "../../api/task/taskService";
import HomeTaskTable from "../../components/dashboard/home/HomeTaskTable";
import BudgetGraph from "../../components/display/budget/BudgetGraph";
import { getBudgetGraphParams } from "../../service/budgetService";
import { Budget, Task } from "../../types";

export default async function DashboardPage() {
  const allTasksJson = await getAllTasks();
  const allTasks = (JSON.parse(allTasksJson) as Task[]).sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const budgetJSON = await getBudget();
  const parsedBudget = JSON.parse(budgetJSON) as Budget;
  const graphProps = await getBudgetGraphParams(parsedBudget);

  return (
    <div className="greedyContainer">
      <div style={{ height: "50%" }}>
        <HomeTaskTable tasks={allTasks} />
      </div>
      <div className="rowContainer" style={{ height: "50%" }}>
        <BudgetGraph {...graphProps} />
      </div>
    </div>
  );
}
