"use server";

import { getUser } from "../api/service/userService";
import { createSha256Hash } from "../lib/util";
import { Session, User } from "../types";
import { createSessionCookie, checkUserSession } from "./sessionService";

export const login = async (
  username: string,
  password: string
): Promise<LoginReponse> => {
  let user = await retrieveUser(username);

  if (!user || user.password !== createSha256Hash(password)) {
    return {
      success: false,
      message: "Invalid username or password",
    };
  }

  /*TODO Consider resuing old sessions tp prevent needing to login again
   * on new devices after logging in on one device
   */
  await checkUserSession(user);

  /*TODO Retrieving the user twice in the same fn, may need to be reworked */
  user = await retrieveUser(username);

  await createSessionCookie(user);

  const sessionExp = (JSON.parse(user.session!!) as Session).exp; //Will never be null as we just added a session

  console.log({ sessionExp });

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
