"use server";

import DashboardBudgetUI from "../../../components/dashboard/budget/DashboardBudgetUI";

export default async function BudgetPage() {
  return (
    <div className="db-vert-grid">
      <div className="db-vert-grid-card-1">
        <DashboardBudgetUI />
      </div>
    </div>
  );
}
