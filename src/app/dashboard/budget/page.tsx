"use server";

import DashboardBudgetUI from "../../../components/dashboard/budget/DashboardBudgetUI";
import { getBudget } from "../../../service/budget/budgetService";

export default async function BudgetPage() {
  const dbBudget = await getBudget();
  return <DashboardBudgetUI budgetJSON={dbBudget} />;
}
