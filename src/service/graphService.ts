"use sever";

import { getBudget } from "../api/budget/budgetService";
import { stripTimeFromDate } from "../lib/util";
import { Budget, Charge } from "../types";
import { getFirstOfWeek } from "../util";
import { deserializeCharge } from "./chargeService";

export type ChargeSum = {
  utcDate: string;
  chargeSum: number;
};

export const getChargeSumsByWeek = async (): Promise<ChargeSum[]> => {
  const budgetJson = await getBudget();
  const budget = JSON.parse(budgetJson) as Budget;

  const charges = budget.charges.map((chargeString) => deserializeCharge(chargeString));

  const chargeMap = new Map<string, Charge[]>();

  charges.forEach((charge) => {
    const chargeDate = new Date(charge.utcDate);

    const firstOfWeekDate = stripTimeFromDate(getFirstOfWeek(chargeDate));
    const firstOfWeekString = firstOfWeekDate.toISOString();

    const chargeWeek = chargeMap.get(firstOfWeekString);

    chargeWeek === undefined
      ? chargeMap.set(firstOfWeekString, [charge])
      : chargeWeek.push(charge);
  });

  const chargeSumMap = Array.from(chargeMap.entries())
    .sort((a, b) => {
      return new Date(b[0]).getTime() - new Date(a[0]).getTime();
    })
    .map((entry) => {
      return {
        utcDate: entry[0],
        chargeSum: entry[1].reduce((acc, charge) => acc + charge.amount, 0),
      };
    });

  return chargeSumMap;
};

type GraphParams = {
  charges: ChargeSum[];
  view: "week" | "last4";
};

export type WeekGraphProps = {
  limit: number;
  total: number;
  barPercentage: number;
};

type ReturnType = WeekGraphProps | ChargeSum[] | null;

export const getGraphParams = async (GraphParams: GraphParams): Promise<ReturnType> => {
  //TODO This is a temporary fix, need to track the budget by date
  const budgetJson = await getBudget();
  const budget = JSON.parse(budgetJson) as Budget;
  /*  */

  const { charges, view } = GraphParams;

  if (charges.length === 0) return null;
  switch (view) {
    case "week":
      const today = new Date();
      const firstOfWeekUtc = stripTimeFromDate(getFirstOfWeek(today)).toISOString();
      const currentWeek = charges.find((charge) => charge.utcDate === firstOfWeekUtc);
      if (currentWeek === undefined) return null;
      const limit = budget.limit; //TODO This is a temporary fix, need to track the budget by date
      const total = currentWeek.chargeSum;
      const barPercentage = (total / limit) * 100;
      return { limit, total, barPercentage } as WeekGraphProps;

    case "last4":
      const last4Weeks = charges.slice(0, 4).toReversed();
      return last4Weeks;

    default:
      return null;
  }
};
