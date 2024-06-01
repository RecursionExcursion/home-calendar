"use client";

import { useEffect, useState } from "react";
import { Budget, Charge } from "../../types";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { saveBudget } from "../../api/service/budgetService";

type DashboardBudgetUIProps = {
  budget: string;
};

export default function DashboardBudgetUI(props: DashboardBudgetUIProps) {
  const [budget, setBudget] = useState<Budget>({} as Budget);
  const [initalBudget, setInitialBudget] = useState<Budget>({} as Budget);

  const [stateHasChanged, setStateHasChanged] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [newCharge, setNewCharge] = useState(getEmptyCharge());

  useEffect(() => {
    const parsedBudget = JSON.parse(props.budget);
    setBudget(parsedBudget);
    setInitialBudget(parsedBudget);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (initalBudget?.weeklyBudget !== budget?.weeklyBudget) {
      setStateHasChanged(true);
      return;
    }
    setStateHasChanged(false);
  }, [budget]);

  const handleSaveBudgetClick = async () => {
    if (!budget) {
      return;
    }
    const res = await saveBudget(budget);
    console.log({ res });
    setStateHasChanged(false);
  };

  //TODO Break into smaller componenents

  return !loaded ? null : (
    <div className="flex flex-col items-center p-2 gap-5">
      <h2 className="text-xl font-semibold">Budget</h2>

      <div>
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
      {stateHasChanged && (
        <Button text="Save" onClick={handleSaveBudgetClick} />
      )}

      <div className="flex flex-col items-center">
        <BudgetH2>Add a Charge</BudgetH2>
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
      </div>
    </div>
  );
}

type BudgetInputGroupProps = {
  labelAttrs: React.ComponentPropsWithoutRef<"label">;
  inputAttrs: React.ComponentPropsWithoutRef<"input">;
};

const BudgetInputGroup = (props: BudgetInputGroupProps) => {
  const { labelAttrs, inputAttrs } = props;
  return (
    <div className="flex flex-col items-center gap-1">
      <label className="text-nowrap" {...labelAttrs}>
        {labelAttrs.children}
      </label>
      <Input {...inputAttrs} />
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

const BudgetH2 = (props: React.ComponentPropsWithoutRef<"h2">) => {
  return <h2 className="text-xl font-semibold" {...props} />;
};
