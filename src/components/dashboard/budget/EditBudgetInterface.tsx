"use client";

import { useEffect, useState } from "react";
import { Budget } from "../../../types";
import { BudgetState } from "./DashboardBudgetUI";
import { useDashboardContext } from "../../../contexts";
import { saveBudget } from "../../../service/budget/budgetService";

type EditBudgetIntefaceProps = {
  budgetState: BudgetState;
};

export default function EditBudgetInteface(props: EditBudgetIntefaceProps) {
  const { budget, setBudget } = props.budgetState;

  const { showToast } = useDashboardContext();

  const [stateHasChanged, setStateHasChanged] = useState(false);

  //TODO remove?
  const [initalBudget, setInitialBudget] = useState<Budget>({ ...budget });

  const [editMode, setEditMode] = useState(false);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (initalBudget?.limit !== budget?.limit) {
      setStateHasChanged(true);
      return;
    }
    setStateHasChanged(false);
  }, [budget]);

  const handleBudgetLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!budget) return;

    const parsed = parseInt(e.target.value);
    if (!Number.isNaN(parsed)) {
      setBudget(
        (prev) =>
          ({
            ...prev,
            weeklyBudget: parsed,
          } as Budget)
      );
    }
  };

  /*TODO: Make it so the weekly budget resets to its inital valule when Save
   * is pressed. May need to have the inital state in the parent.
   */
  const handleSaveBudgetClick = async () => {
    if (!budget) {
      return;
    }

    try {
      const res = await saveBudget(budget);
      setStateHasChanged(false);
      setEditMode(false);
      showToast({
        title: "Success",
        message: "Budget updated successfully",
        type: "success",
      });
    } catch (e) {
      showToast({
        title: "Error",
        message: "An error occurred while updating the budget",
        type: "error",
      });
    }
  };

  return !loaded ? null : (
    <div
      className="flex-col"
      style={{
        gap: "1rem",
      }}
    >
      <div className="flex gap-0_5">
        <label className="text-xl text-nowrap">Edit Budget</label>
        <input
          className="db-checkbox"
          type="checkbox"
          checked={editMode}
          onChange={() => setEditMode((prev) => !prev)}
        />
      </div>

      {editMode && (
        <>
          <div className="col--container">
            <label>Weekly Budget</label>
            <input
              className="db-input"
              disabled={!editMode}
              type="number"
              value={budget?.limit}
              onChange={handleBudgetLimitChange}
            />
          </div>

          {editMode && (
            <button
              className="db-button"
              onClick={handleSaveBudgetClick}
              disabled={!stateHasChanged}
            >
              Save
            </button>
          )}
        </>
      )}
    </div>
  );
}
