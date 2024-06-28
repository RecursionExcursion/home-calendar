"use server";

import { revalidatePath } from "next/cache";
import { appendUrlParams, getUserApiPath } from "../app/api/apiRoutes";
import { User } from "../types";

const revalidateAll = () => revalidatePath("/", "layout");

export const createNewUser = async (username: string, password: string) => {
  const url = await getUserApiPath();

  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    cache: "no-store",
  });

  if (!res.ok) return JSON.stringify({});

  return res.text();
};

export const getUser = async (search: string, searchBy: "id" | "username") => {
  const url = await getUserApiPath();

  await appendUrlParams(url, { search, searchBy });

  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) return JSON.stringify({});

  return res.text();
};

export const saveUser = async (userJSON: string) => {
  const url = await getUserApiPath();
  const res = await fetch(url, {
    method: "PUT",
    body: userJSON,
    cache: "no-store",
  });

  if (!res.ok) return JSON.stringify({});
  const resObj = JSON.parse(await res.text());
  revalidateAll();

  const success = resObj.modifiedCount === 1;

  const user = JSON.parse(userJSON) as User;

  const updatedUserJSON = await getUser(user._id.toString(), "id");
  const updatedUser = JSON.parse(updatedUserJSON);

  return JSON.stringify({ success, updatedUser });
};
