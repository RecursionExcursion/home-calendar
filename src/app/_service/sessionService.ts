"use server";

import { createUserCookie } from "../_lib/cookieManager";
import {
  createSession,
  decryptSession,
  deserializeSession,
  encryptSession,
  serializeSession,
} from "../_types/models/session";
import { User } from "../_types/models/user";
import { getUser, saveUser } from "../(api)/service/userService";

export const addUserSession = async (user: User) => {
  const session = createSession(user);
  user.session = serializeSession(session);
  await saveUser(JSON.stringify(user));
};

export const createSessionCookie = async (user: User) => {
  const session = deserializeSession(user.session!!);
  const encryptedSession = await encryptSession(session);
  await createUserCookie(encryptedSession);
};

export const validateUserCookie = async (
  cookieValue: string
): Promise<User | null> => {
  if (cookieValue === "") {
    return null;
  }
  const userSession = await decryptSession(cookieValue);
  const { userId, exp } = userSession;

  if (exp < new Date().getTime()) {
    return null;
  }

  const user = await getUser(userId, "id").then((user) => {
    return JSON.parse(user) as User;
  });

  const dbUserSession = deserializeSession(user.session!!);
  const encrypedDbSession = await encryptSession(dbUserSession);

  if (encrypedDbSession !== cookieValue) {
    return null;
  }

  return user;
};
