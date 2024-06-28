"use server";

import {
  appendUrlParams,
  getBudgetApiUrl,
  internalApiFetch,
  revalidateApp,
} from "../app/api/apiUtil";

export const createNewBudget = async (userId: string) => {
  const url = await getBudgetApiUrl();

  const res = await internalApiFetch(url, "POST", userId);

  if (!res.ok) return JSON.stringify({});

  revalidateApp();
  return res.text();
};

export const getBudget = async (userId: string) => {
  const url = await getBudgetApiUrl();

  await appendUrlParams(url, { userId });

  const res = await internalApiFetch(url, "GET");

  if (!res.ok) return JSON.stringify({});

  return res.text();
};

export const saveBudget = async (budgetJSON: string) => {
  const url = await getBudgetApiUrl();

  const res = await internalApiFetch(url, "PUT", budgetJSON);

  if (!res.ok) return JSON.stringify({});

  revalidateApp();
  return res.text();
};
