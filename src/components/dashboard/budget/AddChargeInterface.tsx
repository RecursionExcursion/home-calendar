"use client";

import { useEffect, useState } from "react";
import { useDashboardContext } from "../../../contexts";
import NumberInput from "../../base/NumberInput";
import { createNewCharge, serializeCharge } from "../../../service/chargeService";
import DatePicker from "../../base/datePicker/DatePicker";
import { useContentContext } from "../../../contexts/UserContentContext";
import { saveBudget } from "../../../app/api/budget/budgetServiceApi";

type AddChargeInterfaceProps = {
  setLoading: (toState: boolean, msDelay?: number | undefined) => void;
};

export const AddChargeInterface = (props: AddChargeInterfaceProps) => {
  const { setLoading } = props;

  const { budget, updateContentState } = useContentContext();

  const { showToast } = useDashboardContext();

  const [chargeDraft, setChargeDraft] = useState(getEmptyCharge());
  const [chargeDraftDate, setChargeDraftDate] = useState(new Date(chargeDraft.utcDate));

  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [dateIsValidFlag, setDateIsValidFlag] = useState(true);

  useEffect(() => {
    setButtonEnabled(chargeDraft.amount > 0 && dateIsValidFlag);
  }, [chargeDraft, chargeDraftDate, dateIsValidFlag]);

  const handleAddCharge = async () => {
    if (!budget) return;
    setLoading(true);

    const budgetCopy = { ...budget };

    const newCharge = createNewCharge(
      chargeDraftDate.toISOString(),
      chargeDraft.amount,
      chargeDraft.description
    );

    budgetCopy.charges.push(serializeCharge(newCharge));

    await saveBudget(budgetCopy);
    setChargeDraft(getEmptyCharge());
    updateContentState("charge");

    setLoading(false, 750);

    showToast({
      title: "Success",
      message: "Charge added successfully",
      type: "success",
    });
  };

  const handleChargeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    let { value } = e.target;

    switch (name) {
      case "utcDate":
        const date = new Date(value);

        value = date.toISOString();

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

    setChargeDraft((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateCharge = (): boolean => {
    const amountRegex = /^\$?[\d,]+(\.\d*)?$/;

    if (!amountRegex.test(chargeDraft.amount.toString())) {
      return false;
    }

    chargeDraft.amount = parseFloat(chargeDraft.amount.toString());

    return true;
  };

  return (
    <div className="flex-col gap-1">
      <h2 className="text-2xl">Add a Charge</h2>

      <div className="flex-col gap-1">
        <label className="text-xl" htmlFor="date">
          Date
        </label>
        <DatePicker
          date={chargeDraftDate}
          setDate={setChargeDraftDate}
          setValidityFlag={setDateIsValidFlag}
        />
      </div>

      <div className="flex-col gap-1">
        <label className="text-xl" htmlFor="date">
          Amount
        </label>
        <NumberInput
          setter={setChargeDraft}
          className="db-input"
          type="text"
          name="amount"
          value={chargeDraft.amount}
        />
      </div>

      <div className="flex-col gap-1">
        <label className="text-xl" htmlFor="date">
          Description
        </label>
        <input
          className="db-input"
          type="text"
          name="description"
          value={chargeDraft.description}
          onChange={handleChargeChange}
        />
      </div>

      <button className="db-button" onClick={handleAddCharge} disabled={!buttonEnabled}>
        Add Charge
      </button>
    </div>
  );
};

type ChargeDraft = {
  utcDate: string;
  amount: number;
  description: string;
};

const getEmptyCharge = (): ChargeDraft => {
  return {
    utcDate: new Date().toISOString(),
    amount: 0.0,
    description: "",
  };
};
