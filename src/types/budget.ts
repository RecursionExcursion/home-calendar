import { ObjectId } from "mongodb";

export type Budget = {
  _id: ObjectId;
  userId: string;
  limit: number;
  charges: string[];
};

export type HistoricalBudget = {
  date: string;
  budget: number;
  actual: number;
};

export type Charge = {
  id: string;
  utcDate: string;
  amount: number;
  description: string;
};

export type DisplayBudget = {
  utcDate: Date;
  budget: number;
  actual: number;
};
