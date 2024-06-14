"use client";

import { useEffect, useState } from "react";
import { BudgetInputGroup } from "./BudgetInputGroup";
import { Budget } from "../../../types";
import { saveBudget } from "../../../api/budget/budgetService";
import { BudgetState } from "./DashboardBudgetUI";
import { Button } from "../../base";

type EditBudgetIntefaceProps = {
  budgetState: BudgetState;
};

export default function EditBudgetInteface(props: EditBudgetIntefaceProps) {
  const { budget, setBudget } = props.budgetState;

  const [stateHasChanged, setStateHasChanged] = useState(false);

  const [initalBudget, setInitialBudget] = useState<Budget>({ ...budget });

  const [editMode, setEditMode] = useState(false);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (initalBudget?.weeklyBudget !== budget?.weeklyBudget) {
      setStateHasChanged(true);
      return;
    }
    setStateHasChanged(false);
  }, [budget]);

  /*TODO: Make it so the weekly budget resets to its inital valule when Save
   * is pressed. May need to have the inital state in the parent.
   */
  const handleSaveBudgetClick = async () => {
    if (!budget) {
      return;
    }
    const res = await saveBudget(budget);
    setStateHasChanged(false);
    // setEditMode(false);
  };

  return !loaded ? null : (
    <div
      className="colContainer"
      style={{
        gap: "1rem",
      }}
    >
      <BudgetInputGroup
        labelAttrs={{
          children: "Edit Budget",
        }}
        inputAttrs={{
          type: "checkbox",
          checked: editMode,
          onChange: () => setEditMode((prev) => !prev),
        }}
      />

      <BudgetInputGroup
        labelAttrs={{
          children: "Weekly Budget",
        }}
        inputAttrs={{
          disabled: !editMode,
          type: "number",
          value: budget?.weeklyBudget,
          onChange: (e) => {
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
          },
        }}
      />
      {stateHasChanged && editMode && (
        <Button child="Save" onClick={handleSaveBudgetClick} />
      )}
    </div>
  );
}
