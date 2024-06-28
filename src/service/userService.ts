"use server";

import { appendUrlParams, getUserApiUrl, revalidateApp } from "../app/api/apiRoutes";
import { User } from "../types";

export const createNewUser = async (username: string, password: string) => {
  const url = await getUserApiUrl();

  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    cache: "no-store",
  });

  if (!res.ok) return JSON.stringify({});

  return res.text();
};

export const getUser = async (search: string, searchBy: "id" | "username") => {
  const url = await getUserApiUrl();

  await appendUrlParams(url, { search, searchBy });

  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) return JSON.stringify({});

  return res.text();
};

export const saveUser = async (userJSON: string) => {
  const url = await getUserApiUrl();
  const res = await fetch(url, {
    method: "PUT",
    body: userJSON,
    cache: "no-store",
  });

  if (!res.ok) return JSON.stringify({});
  const resObj = JSON.parse(await res.text());
  revalidateApp();

  const success = resObj.modifiedCount === 1;

  const user = JSON.parse(userJSON) as User;

  const updatedUserJSON = await getUser(user._id.toString(), "id");
  const updatedUser = JSON.parse(updatedUserJSON);

  return JSON.stringify({ success, updatedUser });
};
