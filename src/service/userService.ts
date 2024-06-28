"use server";

import {
  appendUrlParams,
  internalApiFetch,
  getUserApiUrl,
  revalidateApp,
} from "../app/api/apiUtil";
import { User } from "../types";

export const createNewUser = async (username: string, password: string) => {
  const url = await getUserApiUrl();

  const res = await internalApiFetch(url, "POST", JSON.stringify({ username, password }));

  if (!res.ok) return JSON.stringify({});

  return res.text();
};

export const getUser = async (search: string, searchBy: "id" | "username") => {
  const url = await getUserApiUrl();

  await appendUrlParams(url, { search, searchBy });

  const res = await internalApiFetch(url, "GET");

  if (!res.ok) return JSON.stringify({});

  return res.text();
};

export const saveUser = async (userJSON: string) => {
  const url = await getUserApiUrl();

  const res = await internalApiFetch(url, "PUT", userJSON);

  if (!res.ok) return JSON.stringify({});

  const resObj = JSON.parse(await res.text());
  revalidateApp();

  const success = resObj.modifiedCount === 1;

  const user = JSON.parse(userJSON) as User;
  const updatedUserJSON = await getUser(user._id.toString(), "id");
  const updatedUser = JSON.parse(updatedUserJSON);

  return JSON.stringify({ success, updatedUser });
};
