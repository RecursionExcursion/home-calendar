"use client";

import { useEffect, useState } from "react";
import { useUserContext } from "../../../contexts";
import { useAppLoadingContext } from "../../../contexts/AppLoadingContext";
import { saveUser } from "../../../service/userService";
import { User } from "../../../types";

export default function DeleteTasksAfterMenu() {
  const { setAppLoading } = useAppLoadingContext();
  const { user } = useUserContext();

  const [deleteAfterNDays, setDeleteAfterNDays] = useState(
    user.settings.deleteTasksAfterNDays
  );

  const [originalState, setOriginalState] = useState(deleteAfterNDays);

  const [enableSaveButton, setEnableSaveButton] = useState(false);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numberValue = parseInt(value);

    if (isNaN(numberValue) || numberValue < -1) {
      return;
    }

    setDeleteAfterNDays(numberValue);
  };

  useEffect(() => {
    setEnableSaveButton(originalState !== deleteAfterNDays);
  }, [deleteAfterNDays, originalState]);

  const handleSaveClick = async () => {
    setAppLoading(true);
    user.settings.deleteTasksAfterNDays = deleteAfterNDays;
    const res = await saveUser(JSON.stringify(user));

    const resObj = JSON.parse(res);
    const resUser = resObj.updatedUser as User;
    const deleteTime = resUser.settings.deleteTasksAfterNDays;

    setDeleteAfterNDays(deleteTime);
    setOriginalState(deleteTime);
    setAppLoading(false);
  };

  return (
    <div
      className="flex-col gap-1"
      style={{
        padding: "1rem",
        width: "100%",
      }}
    >
      <label className="text-nowrap">Delete tasks after</label>
      <div className="flex gap-0_5">
        <input
          className="db-input"
          type="number"
          value={deleteAfterNDays}
          onChange={handleNumberChange}
        />
        <label>days</label>
      </div>
      <button
        className="db-button"
        onClick={handleSaveClick}
        disabled={!enableSaveButton}
      >
        Save
      </button>
    </div>
  );
}
