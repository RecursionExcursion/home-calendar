"use client";

import { AddChargeInterface } from "../budget/AddChargeInterface";
import EditBudgetInteface from "../budget/EditBudgetInterface";
import { Budget } from "../../types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { H2 } from "../base";

type DashboardBudgetUIProps = {
  budgetJSON: string;
};

export type BudgetState = {
  budget: Budget;
  setBudget: Dispatch<SetStateAction<Budget>>;
};

export default function DashboardBudgetUI(props: DashboardBudgetUIProps) {
  const [budget, setBudget] = useState({} as Budget);

  useEffect(() => {
    const parsed = JSON.parse(props.budgetJSON);
    setBudget(parsed);
  }, []);

  /*TODO Add toast to confirm update was successful, and to show errors
   * Clear inputs after submission
   */

  return (
    <div className="colContainer">
      <H2>Budget</H2>
      <EditBudgetInteface
        budgetState={{
          budget,
          setBudget,
        }}
      />
      <AddChargeInterface
        budgetState={{
          budget,
          setBudget,
        }}
      />
    </div>
  );
}
