"use server";

import { saveBudget } from "../api/service/budgetService";
import { getFirstOfWeek } from "../components/calendar/util";
import { stripTimeFromDate } from "../lib/util";
import { Budget, Charge, DisplayBudget, PastBudget } from "../types";

export const computeBudget = async (budgetJSON: string | undefined) => {
  if (!budgetJSON) {
    return;
  }

  const parsedBudget = JSON.parse(budgetJSON) as Budget;

  const today = new Date();

  let firstOfWeek = getFirstOfWeek(today);
  firstOfWeek = stripTimeFromDate(firstOfWeek);

  console.log({ parsedBudget, today, firstOfWeek });

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

    console.log({ firstOfChargeWeek, chargeDate });

    const budgetIndex = pastBudgets.findIndex((budget) => {
      const budgetDate = new Date(budget.date);
      return budgetDate.getTime() === firstOfChargeWeek.getTime();
    });

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
