"use server";

import { getUser } from "../user/userService";
import { createSha256Hash, normalizeString } from "../lib/util";
import { User } from "../types";
import { manageSession } from "./sessionService";

export const login = async (
  username: string,
  password: string
): Promise<LoginReponse> => {
  const normalizeUN = normalizeString(username);

  let user = await retrieveUser(normalizeUN);

  if (!user || user.password !== createSha256Hash(password)) {
    return {
      success: false,
      message: "Invalid username or password",
    };
  }

  const sessionExp = await manageSession(user);

  return {
    success: true,
    message: "User logged in",
    sessionExp: sessionExp,
  };
};

const retrieveUser = async (username: string): Promise<User> => {
  let userJSON = await getUser(username, "username");
  return JSON.parse(userJSON) as User;
};

type LoginReponse = {
  success: boolean;
  message: string;
  sessionExp?: number;
};
