"use server";

import { ObjectId } from "mongodb";
import { createBudget, readUserBudget, updateBudget } from "./budgetRepoApi";
import { Budget } from "../../../types";
import { deserializeCharge } from "../../../util";

export const createNewBudget = async (userId: string) => {
  const newBudget: Budget = {
    _id: new ObjectId(),
    userId,
    limit: 0,
    charges: [],
  };
  return createBudget(newBudget);
};

export const getBudget = async (userId: string) => {
  let budget = await readUserBudget(userId);

  if (!budget) {
    await createNewBudget(userId);
    budget = await readUserBudget(userId);
  }

  return budget;
};

export const saveBudget = async (budget: Budget) => {
  sortCharges(budget);
  return updateBudget(budget);
};

const sortCharges = (budget: Budget) => {
  budget.charges.sort((a, b) => {
    const aBud = deserializeCharge(a);
    const bBud = deserializeCharge(b);
    return new Date(aBud.utcDate).getTime() - new Date(bBud.utcDate).getTime();
  });
};
