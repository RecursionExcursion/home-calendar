"use client";

import { useEffect, useState } from "react";
import { useDashboardContext, useUserContext } from "../../../contexts";
import NumberInput from "../../base/NumberInput";
import { createNewCharge } from "../../../service/chargeService";
import DatePicker from "../../base/datePicker/DatePicker";
import { useAppLoadingContext } from "../../../contexts/AppLoadingContext";

export const AddChargeInterface = () => {
  const { setAppLoading } = useAppLoadingContext();
  const { user } = useUserContext();

  const { showToast } = useDashboardContext();

  const [chargeDraft, setChargeDraft] = useState(getEmptyCharge());
  const [chargeDraftDate, setChargeDraftDate] = useState(new Date(chargeDraft.utcDate));

  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [dateIsValidFlag, setDateIsValidFlag] = useState(true);

  useEffect(() => {
    setButtonEnabled(chargeDraft.amount > 0 && dateIsValidFlag);
  }, [chargeDraft, chargeDraftDate, dateIsValidFlag]);

  const handleAddCharge = async () => {
    setAppLoading(true);

    const res = await createNewCharge(
      user._id.toString(),
      chargeDraftDate.toISOString(),
      chargeDraft.amount,
      chargeDraft.description
    );

    if (res) {
      setChargeDraft(getEmptyCharge());

      showToast({
        title: "Success",
        message: "Charge added successfully",
        type: "success",
      });
    } else {
      showToast({
        title: "Error",
        message: "Failed to add charge",
        type: "error",
      });
    }
    setAppLoading(false);
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
