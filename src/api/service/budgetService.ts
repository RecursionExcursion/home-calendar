"use server";

import { ObjectId } from "mongodb";
import { Budget } from "../../types";
import {
  createBudget,
  readAllBudgets,
  updateBudget,
} from "../repository/budgetRepo";

const getAllBudgets = async (): Promise<Budget[]> => {
  return (await readAllBudgets()) as Budget[];
};

export const newBudget = async (): Promise<boolean> => {
  const allBudgets = await getAllBudgets();

  if (allBudgets.length >= 1) {
    return false;
  }

  const newBudget: Budget = {
    weeklyBudget: 0,
    weeklyCharges: [],
    historicalBudgets: [],
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

  return budgetToJSON(budgets[0]);
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
    weeklyBudget: parsed.weeklyBudget,
    weeklyCharges: parsed.weeklyCharges,
    historicalBudgets: parsed.historicalBudgets,
  };
};

export const budgetToJSON = async (budget: Budget): Promise<string> => {
  return JSON.stringify(budget);
};
