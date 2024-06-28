"use server";

import {
  appendUrlParams,
  getTasksApiUrl,
  internalApiFetch,
  revalidateDashboard,
} from "../app/api/apiUtil";
import { Tasks } from "../types";

export const getTasks = async (userId: string) => {
  const url = await getTasksApiUrl();

  await appendUrlParams(url, { userId });

  const res = await internalApiFetch(url, "GET");

  if (!res.ok) return JSON.stringify({});

  return res.text();
};

export const createTasks = async (userId: string) => {
  const url = await getTasksApiUrl();

  const res = await internalApiFetch(url, "POST", JSON.stringify({ userId }));

  if (!res.ok) return JSON.stringify({});

  revalidateDashboard();
  return res.text();
};

export const updateTasks = async (tasks: Tasks) => {
  const url = await getTasksApiUrl();

  const tasksJson = JSON.stringify(tasks);

  const res = await internalApiFetch(url, "PUT", tasksJson);

  if (!res.ok) return JSON.stringify({});

  revalidateDashboard();
  return res.text();
};
