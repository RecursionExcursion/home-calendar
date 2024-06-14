"use client";

import { useEffect, useState } from "react";
import { useDisplayContext } from "../../../contexts/DisplayContext";
import BudgetWeekGraph, { BudgetGraphProps } from "./BudgetWeekGraph";
import { getBudgetWeekGraphParams } from "../../../service/budgetService";

export default function BudgetDiplay() {
  const { budget } = useDisplayContext();

  const [graphParams, setGraphParams] = useState<BudgetGraphProps>({
    limit: 0,
    total: 0,
    barPercentage: 0,
  });

  useEffect(() => {
    getBudgetWeekGraphParams(budget).then((params) => setGraphParams(params));
  }, []);

  if (budget.weeklyBudget === 0) return null;

  return <BudgetWeekGraph {...graphParams} />;
}
