import BudgetOverview from "../../components/dashboard/budget/BudgetOverview";
import { noDataText } from "../../constants/misc";
import { getChargeSumsByWeek } from "../../service/graphService";
import VerticalGrid from "../../components/ui/VerticalGrid";
import { getUserIdFromCookie } from "../../lib/cookieManager";
import { getTasks } from "../../service/tasksService";
import HomeTaskTable from "../../components/dashboard/home/HomeTaskTable";
import { Tasks } from "../../types";

export default async function DashboardPage() {
  const userId = await getUserIdFromCookie();
  if (!userId) return;

  const fetchTasks = getTasks(userId);
  const fetchChargeSums = getChargeSumsByWeek(userId);

  const [chargeSums, tasksJson] = await Promise.all([fetchChargeSums, fetchTasks]);
  const tasks = JSON.parse(tasksJson) as Tasks;
  const tasksList = tasks.taskList;

  return (
    <VerticalGrid>
      {tasksList.length > 0 ? <HomeTaskTable tasks={tasksList} /> : noDataText}
      {chargeSums.length > 0 ? <BudgetOverview /> : noDataText}
    </VerticalGrid>
  );
}
