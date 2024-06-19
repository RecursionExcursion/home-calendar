"use client";

import { useLoadingContext } from "../../../contexts/LoadingContext";
import { useUserContext } from "../../../contexts";
import { useEffect, useState } from "react";
import { saveUser } from "../../../service/user/userService";
import { User } from "../../../types";

export default function DeleteTasksAfterMenu() {
  const { setLoading } = useLoadingContext();
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
  }, [deleteAfterNDays]);

  const handleSaveClick = async () => {
    setLoading(true);
    user.settings.deleteTasksAfterNDays = deleteAfterNDays;
    const res = await saveUser(JSON.stringify(user));
    const resUser = JSON.parse(res) as User;
    setDeleteAfterNDays(resUser.settings.deleteTasksAfterNDays);
    setOriginalState(resUser.settings.deleteTasksAfterNDays);
    setLoading(false);
  };

  return (
    <div
      className="col-container gap-1 basic-border"
      style={{
        padding: "1rem",
        width: "100%",
      }}
    >
      <label className="text-nowrap">Delete tasks after</label>
      <div className="row-container gap-0_5">
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
