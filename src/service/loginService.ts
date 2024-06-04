"use server";

import { getUser } from "../api/service/userService";
import { createSha256Hash } from "../lib/util";
import { User } from "../types";
import { createSessionCookie, addUserSession } from "./sessionService";

export const login = async (username: string, password: string) => {
  let user = await retrieveUser(username);

  if (user.password !== createSha256Hash(password)) {
    return {
      success: false,
      message: "Invalid password",
    };
  }

  console.log({ user });

  await addUserSession(user);
  user = await retrieveUser(username);

  console.log({ user });

  await createSessionCookie(user);

  return {
    success: true,
    message: "User logged in",
  };
};

const retrieveUser = async (username: string): Promise<User> => {
  let userJSON = await getUser(username, "username");
  return JSON.parse(userJSON) as User;
};

type LoginReponse = {
  success: boolean;
  message: string;
};
