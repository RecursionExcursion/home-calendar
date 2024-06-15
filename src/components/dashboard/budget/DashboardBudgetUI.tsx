"use client";

import { AddChargeInterface } from "./AddChargeInterface";
import EditBudgetInteface from "./EditBudgetInterface";
import { Budget } from "../../../types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type DashboardBudgetUIProps = {
  budgetJSON: string;
};

export type BudgetState = {
  budget: Budget;
  setBudget: Dispatch<SetStateAction<Budget>>;
};

export default function DashboardBudgetUI(props: DashboardBudgetUIProps) {
  const [budget, setBudget] = useState(JSON.parse(props.budgetJSON) as Budget);

  /*TODO Add toast to confirm update was successful, and to show errors
   * Clear inputs after submission
   */

  return (
    <div className="col-container gap-1">
      <h2 className="db-h2">Budget</h2>
      <EditBudgetInteface budgetState={{ budget, setBudget }} />
      <AddChargeInterface budgetState={{ budget, setBudget }} />
    </div>
  );
}
