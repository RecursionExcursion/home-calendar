"use server";

import BudgetOverview from "../../components/dashboard/budget/BudgetOverview";
import HomeTaskTable from "../../components/dashboard/home/HomeTaskTable";
import ClientLoadState from "../../components/misc/ClientLoadState";
import { noDataText } from "../../constants/misc";
import { getChargeSumsByWeek } from "../../service/graphService";
import { getAllTasks } from "../../service/task/taskService";
import { Task } from "../../types";

export default async function DashboardPage() {
  const allTasksJson = await getAllTasks();
  const allTasks = (JSON.parse(allTasksJson) as Task[]).sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const chargeSums = await getChargeSumsByWeek();

  return (
    <div className="db-vert-grid">
      <div className="db-vert-grid-card-1">
        {allTasks.length > 0 ? <HomeTaskTable tasks={allTasks} /> : noDataText}
      </div>
      <div className="db-vert-grid-card-2">
        {chargeSums.length > 0 ? <BudgetOverview /> : noDataText}
      </div>
      <ClientLoadState msDelay={1500} />
    </div>
  );
}
