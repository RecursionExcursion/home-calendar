"use server";

import { headers } from "next/headers";

const getUrlWithBase = async (path: string) => {
  const headersList = headers();

  const prefix = "http://";
  const host = headersList.get("host");

  const url = new URL(path, prefix + host);
  return url;
};

export const getUserApiPath = async () => await getUrlWithBase("/api/user");
export const getTasksApiPath = async () => await getUrlWithBase("/api/tasks");
export const getBudgetsApiPath = async () => await getUrlWithBase("/api/budgets");

export const appendUrlParams = async (url: URL, paramObject: Object) => {
  Object.entries(paramObject).forEach((e) => url.searchParams.append(e[0], e[1]));
};
