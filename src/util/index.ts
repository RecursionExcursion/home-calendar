import { Charge } from "../types";

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

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
