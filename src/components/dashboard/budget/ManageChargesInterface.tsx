"use client";

import { useEffect, useState } from "react";
import { noDataText } from "../../../constants/misc";
import { deleteCharge } from "../../../service/chargeService";
import { Budget, Charge } from "../../../types";
import DatePicker from "../../base/datePicker/DatePicker";
import { getBudget, saveBudget } from "../../../service/budgetService";
import { useUserContext } from "../../../contexts";
import { deserializeCharge, serializeCharge } from "../../../util";
import { useAppLoadingContext } from "../../../contexts/AppLoadingContext";

export default function ManageChargesInterface() {
  const { user } = useUserContext();
  const { setAppLoading } = useAppLoadingContext();

  const [budget, setBudget] = useState<Budget>();

  const [chargeToEdit, setChargeToEdit] = useState<Charge | null>(null);
  const [initialEdit, setInitialEdit] = useState<Charge | null>(null);

  const [editedDate, setEditedDate] = useState<Date>(new Date());

  const [showSave, setShowSave] = useState(false);

  const fetchUserBudget = async () => {
    const budgetJson = await getBudget(user._id.toString());
    const budget = JSON.parse(budgetJson);
    setBudget(budget);
  };

  /* Use Effects */
  useEffect(() => {
    fetchUserBudget();
  }, []);

  useEffect(() => {
    setEditedDate(!chargeToEdit ? new Date() : new Date(chargeToEdit.utcDate));
  }, [chargeToEdit]);

  useEffect(() => {
    if (editedDate.toISOString() === chargeToEdit?.utcDate) return;

    setChargeToEdit((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        utcDate: editedDate.toISOString(),
      };
    });
  }, [editedDate]);

  useEffect(() => {
    const idsAreEqual = chargeToEdit?.id === initialEdit?.id;
    const amountsAreEqual = chargeToEdit?.amount === initialEdit?.amount;
    const datesAreEqual = chargeToEdit?.utcDate === initialEdit?.utcDate;
    const descriptionsAreEqual = chargeToEdit?.description === initialEdit?.description;

    const objectsAreEqual =
      idsAreEqual && amountsAreEqual && datesAreEqual && descriptionsAreEqual;

    setShowSave(!objectsAreEqual);
  }, [chargeToEdit, initialEdit]);

  /* Handlers */
  const handleDeleteClick = async (charge: Charge) => {
    const localDate = new Date(charge.utcDate).toLocaleDateString();

    const res = confirm(
      `Are you sure you want to delete the charge on ${localDate} for $${charge.amount}?`
    );

    if (res) {
      setAppLoading(true);
      await deleteCharge(charge.id, user._id.toString());
      await fetchUserBudget();
      setAppLoading(false);
    }
  };

  const handleEditClick = async (charge: Charge) => {
    if (showSave) {
      const res = confirm('You have unsaved changes. Press "OK" to discard them.');
      if (!res) return;
    }

    if (chargeToEdit?.id === charge.id) {
      setChargeToEdit(null);
      setInitialEdit(null);
      return;
    }

    setEditedDate(new Date(charge.utcDate));
    setChargeToEdit({ ...charge });
    setInitialEdit({ ...charge });
  };

  const handleSaveClick = async () => {
    if (!budget || !chargeToEdit) return;
    setAppLoading(true);

    const budgetCopy = structuredClone(budget);

    const oldChargeIndex = budgetCopy.charges
      .map((c) => deserializeCharge(c).id)
      .indexOf(chargeToEdit.id);

    budgetCopy.charges[oldChargeIndex] = serializeCharge(chargeToEdit);

    await saveBudget(JSON.stringify(budgetCopy));

    await fetchUserBudget();

    setChargeToEdit(null);
    setInitialEdit(null);
    setAppLoading(false);
  };

  if (!budget || budget.charges.length === 0) return <div>{noDataText}</div>;
  return (
    <div className="bm-container">
      <div className="bm-control-container">
        {showSave && (
          <button onClick={handleSaveClick} className="bm-control-button">
            Save
          </button>
        )}
      </div>
      <div className="bm-list-container">
        {budget.charges.map((strCharge) => {
          const charge = deserializeCharge(strCharge);
          const chargeDate = new Date(charge.utcDate).toLocaleDateString();

          const elements = {
            date: <div className="bm-charge-grid-area-date">{chargeDate}</div>,

            amount: <div className="bm-charge-grid-area-amount">${charge.amount}</div>,

            description: (
              <input
                className="bm-charge-grid-area-desc"
                value={charge.description}
                readOnly
              />
            ),
          };

          if (chargeToEdit?.id === charge.id) {
            elements.date = (
              <div className="bm-charge-grid-area-date">
                <div className="bm-input">
                  {editedDate.toLocaleDateString()}
                  <DatePicker
                    date={editedDate}
                    setDate={setEditedDate}
                    onlyModal={true}
                  />
                </div>
              </div>
            );

            elements.amount = (
              <div className="bm-charge-grid-area-amount">
                <input
                  className="bm-input"
                  type="text"
                  value={chargeToEdit.amount}
                  onChange={(e) => {
                    setChargeToEdit((prev) => {
                      if (!prev) return null;
                      return {
                        ...prev,
                        amount: parseFloat(e.target.value),
                      };
                    });
                  }}
                />
              </div>
            );

            elements.description = (
              <input
                className="bm-input-desc"
                type="text"
                value={chargeToEdit.description}
                onChange={(e) => {
                  setChargeToEdit((prev) => {
                    if (!prev) return null;
                    return {
                      ...prev,
                      description: e.target.value,
                    };
                  });
                }}
              />
            );
          }

          return (
            <div key={charge.id} className="bm-charge-grid">
              {elements.date}
              {elements.amount}
              {elements.description}
              <div className="bm-charge-grid-area-button1">
                <button className="bm-button" onClick={() => handleEditClick(charge)}>
                  Edit
                </button>
              </div>
              <div className="bm-charge-grid-area-button2">
                <button className="bm-button" onClick={() => handleDeleteClick(charge)}>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
