import { ObjectId } from "mongodb";

export type Budget = {
  _id?: ObjectId;
  weeklyBudget: number;
  weeklyActual: number;
  weeklyCharges: Charge[];
  historicalBudgets: PastBudget[];
};

export type PastBudget = {
  date: string;
  budget: number;
  actual: number;
};

export type Charge = {
  date: string;
  amount: number;
  description: string;
};
