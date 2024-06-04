"use client";

import { useEffect, useState } from "react";
import { BudgetInputGroup } from "./BudgetInputGroup";
import { Budget } from "../../types";
import { saveBudget } from "../../api/service/budgetService";
import Button from "../base/Button";
import { BudgetState } from "../dashboard/DashboardBudgetUI";

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
    console.log({ initalBudget, budget });

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
    console.log({ res });
    setStateHasChanged(false);
    // setEditMode(false);
  };

  return !loaded ? null : (
    <div className="flex flex-col items-center gap-2">
      <div className="flex flex-col gap-2">
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
      </div>

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
        <Button text="Save" onClick={handleSaveBudgetClick} />
      )}
    </div>
  );
}
