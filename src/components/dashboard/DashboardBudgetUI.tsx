"use client";

import { AddChargeInterface } from "../budget/AddChargeInterface";
import EditBudgetInteface from "../budget/EditBudgetInterface";
import { H2 } from "../base/H2";
import { Budget } from "../../types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0.5rem",
        gap: "1.25rem",
      }}
    >
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
