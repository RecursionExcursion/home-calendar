"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

const getUrlWithBase = async (path: string) => {
  const headersList = headers();

  const prefix = "http://";
  const host = headersList.get("host");

  const url = new URL(path, prefix + host);
  return url;
};

export const revalidateDashboard = () => revalidatePath("/dashboard");
export const revalidateApp = () => revalidatePath("/", "layout");

export const getUserApiUrl = async () => await getUrlWithBase("/api/user");
export const getTasksApiUrl = async () => await getUrlWithBase("/api/tasks");
export const getBudgetApiUrl = async () => await getUrlWithBase("/api/budget");

export const appendUrlParams = async (url: URL, paramObject: Object) => {
  Object.entries(paramObject).forEach((e) => url.searchParams.append(e[0], e[1]));
};
