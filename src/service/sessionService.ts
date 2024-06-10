"use server";

import { getUser, saveUser } from "../api/service/userService";
import { createUserCookie, getUserCookie } from "../lib/cookieManager";
import { Session, User } from "../types";
import { v4 as uuidv4 } from "uuid";
import { decryptData, encryptData } from "../lib/crypto";
import { msTimestamps } from "../lib/util";

/*TODO This function is doing too much, consider splitting it up */
export const checkUserSession = async (user: User) => {
  if (user.session) {
    const currentSession = deserializeSession(user.session);
    if (currentSession.exp > new Date().getTime()) {
      return;
    }
    console.log("Session expired, removing session");
    await removeSession(user);
  }
  console.log("Creating new session");
  await createClientSession(user);
};

const createClientSession = async (user: User) => {
  const session = createSession(user);
  user.session = serializeSession(session);
  await saveUser(JSON.stringify(user));
};

export const createSessionCookie = async (user: User) => {
  const session = deserializeSession(user.session!!);
  const encryptedSession = await encryptSession(session);
  await createUserCookie(encryptedSession);
};

const createSession = (user: User): Session => {
  return {
    _id: uuidv4(),
    userId: user._id.toString(),
    exp: new Date().getTime() + msTimestamps.oneWeek,
  };
};

export const removeSession = async (user: User) => {
  user.session = null;
  await saveUser(JSON.stringify(user));
};

const serializeSession = (session: Session): string => {
  return JSON.stringify(session);
};

const deserializeSession = (sessionString: string): Session => {
  return JSON.parse(sessionString) as Session;
};

const encryptSession = async (session: Session): Promise<string> => {
  return await encryptData(JSON.stringify(session)).then((data) => data.encryptedData);
};

const decryptSession = async (sessionString: string): Promise<Session> => {
  return JSON.parse(await decryptData(sessionString)) as Session;
};

export const validateClientSessionCookie = async (
  cookieValue: string
): Promise<User | null> => {
  if (cookieValue === "") {
    return null;
  }

  const clientSession = await decryptSession(cookieValue);

  const user = await getUser(clientSession.userId, "id").then((user) => {
    return JSON.parse(user) as User;
  });

  if (!user || !user.session) {
    return null;
  }

  const dbUserSession = deserializeSession(user.session);

  //Check if session in db is the same as the client session
  if (clientSession._id !== dbUserSession._id) {
    return null;
  }

  //Check if session in db has expired
  if (dbUserSession.exp <= new Date().getTime()) {
    return null;
  }

  /* At this point the only mismatching data can be the expiration date
   * If it is we update the client cookie to match the db session
   */
  if (clientSession.exp !== dbUserSession.exp) {
    await createSessionCookie(user);
  }

  return user;
};

export const renewSession = async () => {
  const userCookie = await getUserCookie();
  if (!userCookie) {
    return;
  }
  const clientSession = await decryptSession(userCookie.value);
  const user = await getUser(clientSession.userId, "id").then((user) => {
    return JSON.parse(user) as User;
  });
  const oldSession = deserializeSession(user.session!!);
  oldSession.exp = new Date().getTime() + msTimestamps.oneWeek;
  user.session = serializeSession(oldSession);
  await saveUser(JSON.stringify(user));
  await createSessionCookie(user);
};
