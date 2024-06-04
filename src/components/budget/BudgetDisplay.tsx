"use client";

import { useDisplayContext } from "../../contexts/DisplayContext";
import { Charge } from "../../types";
import BudgetGraph from "./BudgetGraph";

export default function BudgetDiplay() {
  const { budget } = useDisplayContext();

  const charges = budget.weeklyCharges?.map((charge) => charge as Charge);

  const limit = budget.weeklyBudget;
  const total = charges?.reduce((acc, charge) => acc + charge.amount, 0);

  const barPercentage = (total / limit) * 100;


  return (
    <BudgetGraph
      limit={limit}
      total={total}
      barPercentage={barPercentage}
    />
  );
}
