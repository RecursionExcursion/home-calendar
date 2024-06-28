"use server";

import { Charge } from "../types";
import { v4 as uuidv4 } from "uuid";
import { getBudget, saveBudget } from "./budgetService";
import { deserializeCharge, serializeCharge } from "../util";



export const createNewCharge = async (
  userId: string,
  utcDate: string,
  amount: number,
  description: string
) => {
  const newcharge: Charge = {
    id: uuidv4(),
    utcDate,
    amount,
    description,
  };

  const budgetJson = await getBudget(userId);
  const budget = JSON.parse(budgetJson);

  budget.charges.push( serializeCharge(newcharge));

  const updatedBudget = JSON.stringify(budget);
  const res = await saveBudget(updatedBudget);
  const resObj = JSON.parse(res);

  return resObj.modifiedCount === 1;
};

export const deleteCharge = async (chargeId: string, userId: string) => {
  const budgetJson = await getBudget(userId);
  const budget = JSON.parse(budgetJson);

  const index: number = budget.charges.findIndex(async (charge: string) => {
    const parsed =  deserializeCharge(charge);
    return parsed.id === chargeId;
  });
  budget.charges.splice(index, 1);

  const updatedBudget = JSON.stringify(budget);
  const res = await saveBudget(updatedBudget);
  const resObj = JSON.parse(res);

  return resObj.modifiedCount === 1;
};
