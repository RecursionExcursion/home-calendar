"use client";

import { useState } from "react";
import { Charge } from "../../types";
import Button from "../base/Button";
import { BudgetInputGroup } from "./BudgetInputGroup";
import { H2 } from "../base/H2";
import { saveBudget } from "../../api/service/budgetService";
import { BudgetState } from "../dashboard/DashboardBudgetUI";

type AddChargeInterfaceProps = {
  budgetState: BudgetState;
};

export const AddChargeInterface = (props: AddChargeInterfaceProps) => {
  const { budget, setBudget } = props.budgetState;

  const [newCharge, setNewCharge] = useState(getEmptyCharge());

  const handleAddCharge = async () => {
    const budgetCopy = { ...budget };

    budgetCopy.weeklyCharges.push(newCharge);
    await saveBudget(budgetCopy);
    setBudget(budgetCopy);
  };

  return (
    <div className="flex flex-col items-center gap-3"
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "0.75rem",
    }}>
      <H2>Add a Charge</H2>
      {/* TODO: Flesh out date logic, currenlty it just uses Date.now() */}
      <BudgetInputGroup
        labelAttrs={{
          children: "Date",
        }}
        inputAttrs={{
          type: "date",
          value: newCharge.date,
          onChange: (e) => {
            setNewCharge((prev) => ({
              ...prev,
              date: e.target.value,
            }));
          },
        }}
      />
      {/* TODO: Change to text input and use regex instead of number */}
      <BudgetInputGroup
        labelAttrs={{
          children: "Amount",
        }}
        inputAttrs={{
          type: "number",
          value: newCharge.amount,
          onChange: (e) => {
            setNewCharge((prev) => ({
              ...prev,
              amount: parseInt(e.target.value),
            }));
          },
        }}
      />
      <BudgetInputGroup
        labelAttrs={{
          children: "Description",
        }}
        inputAttrs={{
          type: "text",
          value: newCharge.description,
          onChange: (e) => {
            setNewCharge((prev) => ({
              ...prev,
              description: e.target.value,
            }));
          },
        }}
      />
      <Button text="Add Charge" onClick={handleAddCharge} />
    </div>
  );
};

const getEmptyCharge = (): Charge => {
  return {
    date: new Date().toISOString(),
    amount: 0,
    description: "",
  };
};
