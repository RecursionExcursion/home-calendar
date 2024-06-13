"use server";

import { getBudget } from "../../../api/budget/budgetService";
import DashboardBudgetUI from "../../../components/dashboard/budget/DashboardBudgetUI";

export default async function BudgetPage() {
  const dbBudget = await getBudget();
  return <DashboardBudgetUI budgetJSON={dbBudget} />;
}
