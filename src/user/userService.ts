"use server";

import { createSha256Hash, normalizeString } from "../lib/util";
import { User, buildUserFromJSON, createEmptyUser } from "../types";
import { createUser, deleteUser, readUser, updateUser } from "./userRepo";

export const createNewUser = async (username: string, password: string) => {
  const normalizedUsername = normalizeString(username);

  const newUser: User = createEmptyUser({
    username: normalizedUsername,
    password: createSha256Hash(password),
  });
  const result = await createUser(newUser);
  return JSON.stringify(result);
};

const searchMap = {
  username: async (search: string) => await readUser(search, "username"),
  id: async (search: string) => await readUser(search, "id"),
};

export const getUser = async (searchString: string, searchBy: keyof typeof searchMap) => {
  const user = await searchMap[searchBy](searchString);
  return JSON.stringify(user);
};

export const saveUser = async (userJSON: string) => {
  const user = buildUserFromJSON(userJSON);
  const result = await updateUser(user);
  return JSON.stringify(result);
};

export const removeUser = async (id: string) => {
  const result = await deleteUser(id);
  return JSON.stringify(result);
};
