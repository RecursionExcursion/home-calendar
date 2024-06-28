"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

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

export const getAuthKey = async () => {
  return process.env.API_KEY || "";
};

export const authenticateRequest = async (request: NextRequest) => {
  const auth = request.headers.get("authorization");

  const isAuth = auth === process.env.API_KEY;

  return {
    authorized: isAuth,
    resp: isAuth
      ? null
      : new Response("Unauthorized", {
          status: 401,
          statusText: "Unauthorized",
        }),
  };
};

export const getAuthHeader = async () => {
  const authKey = await getAuthKey();
  return {
    authorization: authKey,
  };
};

type Method = "GET" | "POST" | "PUT" | "DELETE";

export const internalApiFetch = async (url: URL, method: Method, body?: string) => {
  const init: RequestInit = {
    method: method,
    headers: {
      ...(await getAuthHeader()),
    },
    cache: "no-store",
  };

  if (!(method === "GET" || method === "DELETE")) {
    init.body = body;
  }

  return fetch(url, init);
};
