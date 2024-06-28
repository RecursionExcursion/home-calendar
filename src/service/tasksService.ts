"use server";

import {
  appendUrlParams,
  getTasksApiUrl,
  revalidateDashboard,
} from "../app/api/apiRoutes";
import { Tasks } from "../types";

export const getTasks = async (userId: string) => {
  const url = await getTasksApiUrl();

  appendUrlParams(url, { userId });

  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) return JSON.stringify({});

  return res.text();
};

export const createTasks = async (userId: string) => {
  const url = await getTasksApiUrl();

  const res = await fetch(url, {
    body: JSON.stringify(userId),
    method: "POST",
    cache: "no-store",
  });

  if (!res.ok) return JSON.stringify({});

  revalidateDashboard();
  return res.text();
};

export const updateTasks = async (tasks: Tasks) => {
  const url = await getTasksApiUrl();

  const tasksJson = JSON.stringify(tasks);

  const res = await fetch(url, {
    body: tasksJson,
    method: "PUT",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) return JSON.stringify({});

  revalidateDashboard();
  return res.text();
};
