"use server";

import { appendUrlParams, getBudgetApiUrl, revalidateApp } from "../app/api/apiRoutes";

export const createNewBudget = async (userId: string) => {
  const url = await getBudgetApiUrl();

  const res = await fetch(url, {
    method: "POST",
    body: userId,
    cache: "no-store",
  });

  if (!res.ok) return JSON.stringify({});

  revalidateApp();
  return res.text();
};

export const getBudget = async (userId: string) => {
  const url = await getBudgetApiUrl();

  await appendUrlParams(url, { userId });

  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) return JSON.stringify({});

  return res.text();
};

export const saveBudget = async (budgetJSON: string) => {
  const url = await getBudgetApiUrl();
  const res = await fetch(url, {
    method: "PUT",
    body: budgetJSON,
    cache: "no-store",
  });

  if (!res.ok) return JSON.stringify({});

  revalidateApp();
  return res.text();
};
