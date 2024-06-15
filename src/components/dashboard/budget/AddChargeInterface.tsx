"use client";

import { useState } from "react";
import { Charge } from "../../../types";
import { saveBudget } from "../../../api/budget/budgetService";
import { BudgetState } from "./DashboardBudgetUI";
import { useDashboardContext } from "../../../contexts";

type AddChargeInterfaceProps = {
  budgetState: BudgetState;
};

export const AddChargeInterface = (props: AddChargeInterfaceProps) => {
  const { budget, setBudget } = props.budgetState;

  const { showToast } = useDashboardContext();

  const [newCharge, setNewCharge] = useState(getEmptyCharge());

  const handleAddCharge = async () => {
    console.log(validateCharge());

    const budgetCopy = { ...budget };

    budgetCopy.weeklyCharges.push(newCharge);
    await saveBudget(budgetCopy);
    setBudget(budgetCopy);
    setNewCharge(getEmptyCharge());
    showToast({
      title: "Success",
      message: "Charge added successfully",
      type: "success",
    });
  };

  const handleChargeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    let { value } = e.target;

    console.log({ name, value });

    switch (name) {
      case "date":
        break;
      case "amount":
        if (value === "") break;

        const anyInvalid = value
          .split("")
          .find((char) => isNaN(parseInt(char)) && char !== ".");
        if (anyInvalid) return;

        const fixed2Regex = /^\d+(\.\d{0,2})?$/;
        if (!fixed2Regex.test(value)) return;
        break;
      case "description":
        break;
    }

    setNewCharge((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateCharge = (): boolean => {
    const amountRegex = /^\$?[\d,]+(\.\d*)?$/;

    if (!amountRegex.test(newCharge.amount.toString())) {
      return false;
    }

    newCharge.amount = parseFloat(newCharge.amount.toString());

    return true;
  };

  return (
    <div className="colContainer gap-1">
      <h2 className="text-2xl">Add a Charge</h2>

      <div className="colContainer gap-1">
        <label className="text-xl" htmlFor="date">
          Date
        </label>
        <input
          className="db-input"
          type="date"
          name="date"
          value={newCharge.date}
          onChange={handleChargeChange}
        />
      </div>

      <div className="colContainer gap-1">
        <label className="text-xl" htmlFor="date">
          Amount
        </label>
        <input
          className="db-input"
          type="text"
          name="amount"
          value={newCharge.amount}
          onChange={handleChargeChange}
        />
      </div>

      <div className="colContainer gap-1">
        <label className="text-xl" htmlFor="date">
          Description
        </label>
        <input
          className="db-input"
          type="text"
          name="description"
          value={newCharge.description}
          onChange={handleChargeChange}
        />
      </div>

      <button className="db-button" onClick={handleAddCharge}>
        Add Charge
      </button>
    </div>
  );
};

const getEmptyCharge = (): Charge => {
  return {
    date: new Date().toISOString(),
    amount: 0.0,
    description: "",
  };
};
