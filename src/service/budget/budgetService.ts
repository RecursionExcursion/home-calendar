"use server";

import { ObjectId } from "mongodb";
import { createBudget, readAllBudgets, updateBudget } from "./budgetRepo";
import { Budget } from "../../types";

const getAllBudgets = async (): Promise<Budget[]> => {
  return (await readAllBudgets()) as Budget[];
};

export const newBudget = async (): Promise<boolean> => {
  const allBudgets = await getAllBudgets();

  if (allBudgets.length >= 1) {
    return false;
  }

  const newBudget: Budget = {
    limit: 0,
    charges: [],
  };

  await createBudget(newBudget);
  return true;
};

export const getBudget = async () => {
  let budgets = await getAllBudgets();

  if (budgets.length === 0) {
    await newBudget();
    budgets = await getAllBudgets();
  }

  const budget = budgets[0];

  return budgetToJSON(budget);
};

export const saveBudget = async (budget: Budget) => {
  //Ensure that the budget has valid ID
  const regenBudget = await budgetFromJSON(JSON.stringify(budget));

  const res = await updateBudget(regenBudget);

  return JSON.stringify(res);
};

export const budgetFromJSON = async (json: string): Promise<Budget> => {
  const parsed = JSON.parse(json);
  return {
    _id: parsed._id ? ObjectId.createFromHexString(parsed._id) : undefined,
    limit: parsed.limit,
    charges: parsed.charges,
  };
};

export const budgetToJSON = async (budget: Budget): Promise<string> => {
  return JSON.stringify(budget);
};
