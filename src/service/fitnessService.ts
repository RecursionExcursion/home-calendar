"use server";

import {
  appendUrlParams,
  getFitnessApiUrl,
  internalApiFetch,
  revalidateApp,
} from "@/app/api/apiUtil";

export const getFitnessData = async (userId: string) => {
  const url = await getFitnessApiUrl();

  await appendUrlParams(url, { userId });

  const res = await internalApiFetch(url, "GET");

  if (res.ok) {
    return await res.text();
  }

  return null;
};

export const saveFitnessData = async (fitnessJSON: string) => {
  const url = await getFitnessApiUrl();

  const res = await internalApiFetch(url, "PUT", fitnessJSON);

  if (!res.ok) return JSON.stringify({});

  revalidateApp();
  return res.text();
};
