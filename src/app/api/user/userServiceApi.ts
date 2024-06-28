"use server";

import { ObjectId } from "mongodb";
import { createSha256Hash, normalizeString } from "../../../lib/util";
import { User } from "../../../types";
import { createUser, readUser, updateUser } from "./userRepoApi";

export const createNewUser = async (username: string, password: string) => {
  const normalizedUsername = normalizeString(username);
  const hashedPassword = createSha256Hash(password);

  const newUser: User = createEmptyUser(normalizedUsername, hashedPassword);
  const result = await createUser(newUser);
  return JSON.stringify(result);
};

export const getUserById = async (id: string) => {
  const user = await readUser(id, "id");
  return JSON.stringify(user);
};

export const getUserByName = async (name: string) => {
  const user = await readUser(name, "username");
  return JSON.stringify(user);
};

export const saveUser = async (user: User) => {
  const result = await updateUser(user);
  return JSON.stringify(result);
};

/* Helper */

const createEmptyUser = (username: string, password: string): User => {
  return {
    _id: new ObjectId(),
    username,
    password,
    created: new Date().toISOString(),
    settings: {
      userCoords: null,
      deleteTasksAfterNDays: -1,
    },
    friends: [],
    message_ids: [],
    task_ids: [],
    session: null,
  };
};
