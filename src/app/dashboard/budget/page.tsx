"use server";

import DashboardBudgetUI from "../../../components/dashboard/budget/DashboardBudgetUI";
import { getBudget } from "../../../service/budget/budgetService";

export default async function BudgetPage() {
  const dbBudget = await getBudget();
  return (
    <div className="db-vert-grid">
      <div className="db-vert-grid-card-1">
        <DashboardBudgetUI budgetJSON={dbBudget} />
      </div>
    </div>
  );
}
