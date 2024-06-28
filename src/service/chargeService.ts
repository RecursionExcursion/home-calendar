import { getBudget, saveBudget } from "../app/api/budget/budgetServiceApi";
import { Charge } from "../types";
import { v4 as uuidv4 } from "uuid";

export const serializeCharge = (charge: Charge): string => {
  const parts = [charge.id, charge.utcDate, charge.amount.toString(), charge.description];
  const serialized = parts.join(";");
  return serialized;
};

export const deserializeCharge = (serialized: string): Charge => {
  const parts = serialized.split(";");
  return {
    id: parts[0],
    utcDate: parts[1],
    amount: parseFloat(parts[2]),
    description: parts[3],
  };
};

export const createNewCharge = (
  utcDate: string,
  amount: number,
  description: string
): Charge => {
  return {
    id: uuidv4(),
    utcDate,
    amount,
    description,
  };
};

export const deleteCharge = async (chargeId: string) => {
  const budgetJson = await getBudget();
  const budget = JSON.parse(budgetJson);
  const budgetCopy = { ...budget };
  budgetCopy.charges = budgetCopy.charges.filter((charge: string) => {
    const parsed = deserializeCharge(charge);
    return parsed.id !== chargeId;
  });
  await saveBudget(budgetCopy);
};
