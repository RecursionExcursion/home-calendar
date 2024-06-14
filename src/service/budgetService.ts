"use server";

import { saveBudget } from "../api/budget/budgetService";
import { BudgetGraphProps } from "../components/display/budget/BudgetWeekGraph";
import { stripTimeFromDate } from "../lib/util";
import { Budget, Charge, DisplayBudget, PastBudget } from "../types";
import { getFirstOfWeek } from "../util";

export const computeBudget = async (budgetJSON: string | undefined) => {
  if (!budgetJSON) {
    return;
  }

  const parsedBudget = JSON.parse(budgetJSON) as Budget;

  const today = new Date();

  let firstOfWeek = getFirstOfWeek(today);
  firstOfWeek = stripTimeFromDate(firstOfWeek);

  const weeklyCharges: Charge[] = [];
  const nonWeeklyCharges: Charge[] = [];

  parsedBudget.weeklyCharges.forEach((charge) => {
    const chargeDate = new Date(charge.date);
    if (chargeDate >= firstOfWeek) {
      weeklyCharges.push(charge);
    } else {
      nonWeeklyCharges.push(charge);
    }
  });

  //Display Budget
  const displayBudget: DisplayBudget = {
    date: firstOfWeek,
    budget: parsedBudget.weeklyBudget,
    actual: weeklyCharges.reduce((acc, charge) => acc + charge.amount, 0),
  };

  const oldCharges = organizeOldCharges(nonWeeklyCharges);

  parsedBudget.weeklyCharges = weeklyCharges;

  if (oldCharges.length > 0) {
    oldCharges.forEach((oldCharge) => {
      const oldChargeDate = new Date(oldCharge.date);

      const existingBudget = parsedBudget.historicalBudgets.find((budget) => {
        const budgetDate = new Date(budget.date);
        return budgetDate.getTime() === oldChargeDate.getTime();
      });

      if (existingBudget) {
        existingBudget.actual += oldCharge.actual;
      } else {
        parsedBudget.historicalBudgets.push(oldCharge);
      }
    });
  }

  await saveBudget(parsedBudget);

  return { parsedBudget, displayBudget };
};

const organizeOldCharges = (pastCharges: Charge[]): PastBudget[] => {
  const pastBudgets: PastBudget[] = [];

  while (pastCharges.length > 0) {
    const charge = pastCharges.shift() as Charge;
    const chargeDate = new Date(charge.date);
    let firstOfChargeWeek = getFirstOfWeek(chargeDate);
    firstOfChargeWeek = stripTimeFromDate(firstOfChargeWeek);

    const budgetIndex = pastBudgets.findIndex((budget) => {
      const budgetDate = new Date(budget.date);
      return budgetDate.getTime() === firstOfChargeWeek.getTime();
    });

    //TODO Add ability to track historically set budgets instead of using 0
    //TODO Add ability to track historically set budgets instead of using 0
    if (budgetIndex === -1) {
      pastBudgets.push({
        date: firstOfChargeWeek.toISOString(),
        budget: 0,
        actual: charge.amount,
      });
    } else {
      pastBudgets[budgetIndex].actual += charge.amount;
    }
  }

  return pastBudgets;
};

export const getBudgetWeekGraphParams = async (
  budget: Budget
): Promise<BudgetGraphProps> => {
  const charges = budget.weeklyCharges?.map((charge) => charge as Charge);

  const limit = budget.weeklyBudget;
  const total = charges?.reduce((acc, charge) => acc + charge.amount, 0);

  const barPercentage = (total / limit) * 100;

  return { limit, total, barPercentage };
};

export const getBudgetEntriesAsPastBudgets = async (
  budget: Budget
): Promise<PastBudget[]> => {
  const currentHistorical: PastBudget = {
    date: getFirstOfWeek(new Date()).toISOString(),
    budget: budget.weeklyBudget,
    actual: budget.weeklyCharges.reduce((acc, charge) => acc + charge.amount, 0),
  };

  const allChargeWeeks = [...budget.historicalBudgets, currentHistorical];

  return allChargeWeeks;
};
