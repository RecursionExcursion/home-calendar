"use server";

import DashboardBudgetUI from "../../../components/dashboard/budget/DashboardBudgetUI";
import VerticalGrid from "../../../components/ui/VerticalGrid";

export default async function BudgetPage() {
  return (
    <VerticalGrid>
      <DashboardBudgetUI />
    </VerticalGrid>
  );
}
