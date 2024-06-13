"use client";

import { useEffect, useState } from "react";
import { useDisplayContext } from "../../../contexts/DisplayContext";
import BudgetGraph, { BudgetGraphProps } from "./BudgetGraph";
import { getBudgetGraphParams } from "../../../service/budgetService";

export default function BudgetDiplay() {
  const { budget } = useDisplayContext();

  const [graphParams, setGraphParams] = useState<BudgetGraphProps>({
    limit: 0,
    total: 0,
    barPercentage: 0,
  });

  useEffect(() => {
    getBudgetGraphParams(budget).then((params) => setGraphParams(params));
  }, []);

  if (budget.weeklyBudget === 0) return null;

  return <BudgetGraph {...graphParams} />;
}
