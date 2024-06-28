"use server";

import BudgetOverview from "../../components/dashboard/budget/BudgetOverview";
import HomeTaskTable from "../../components/dashboard/home/HomeTaskTable";
import { noDataText } from "../../constants/misc";
import ClientSideLoadState from "../../components/misc/ClientLoadState";
import { getChargeSumsByWeek } from "../../service/graphService";
import { getAllTasks } from "../../service/task/taskService";
import { Task } from "../../types";
import VerticalGrid from "../../components/ui/VerticalGrid";

export default async function DashboardPage() {
  const allTasksJson = await getAllTasks();
  const allTasks = (JSON.parse(allTasksJson) as Task[]).sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const chargeSums = await getChargeSumsByWeek();

  return (
    <>
      <VerticalGrid>
        {allTasks.length > 0 ? <HomeTaskTable tasks={allTasks} /> : noDataText}
        {chargeSums.length > 0 ? <BudgetOverview /> : noDataText}
      </VerticalGrid>
      <ClientSideLoadState msDelay={1500} />
    </>
  );
}
