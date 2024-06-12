"use client";

import { Button, Input } from "../../base";
import { useLoadingContext } from "../../../contexts/LoadingContext";
import { useUserContext } from "../../../contexts";
import { useEffect, useState } from "react";
import { saveUser } from "../../../api/service/userService";
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
    <div className="rowContainer">
      <label>Delete tasks after</label>
      <Input
        theme="number"
        type="number"
        value={deleteAfterNDays}
        onChange={handleNumberChange}
      />
      <label>days</label>
      <Button child={"Save"} onClick={handleSaveClick} disabled={!enableSaveButton} />
    </div>
  );
}
