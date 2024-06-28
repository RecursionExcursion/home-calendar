"use server";

import { createUserCookie, deleteUserCookie, getUserCookie } from "../lib/cookieManager";
import { Session, User } from "../types";
import { v4 as uuidv4 } from "uuid";
import { decryptData, encryptData } from "../lib/crypto";
import { msTimestamps } from "../lib/util";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { SESSION_LENGTH_DAYS } from "../constants/session";
import { getUser, saveUser } from "./userService";

const checkUserSession = (user: User): boolean => {
  if (user.session) {
    const currentSession = deserializeSession(user.session);
    if (currentSession.exp > new Date().getTime()) {
      return true;
    }
  }
  return false;
};

const createSessionExiprationDate = (): Date => {
  const now = new Date();
  now.setHours(0, 0, 0, 0); //Set to midnight
  const weekFromMid = new Date(now.getTime() + msTimestamps.oneDay * SESSION_LENGTH_DAYS); //one week from today 00:00:00
  return weekFromMid;
};

export const manageSession = async (user: User) => {
  const sessionIsValid = checkUserSession(user);

  if (!sessionIsValid) {
    await createClientSession(user);
  }

  if (user.session === null) {
    throw new Error("Session was not created");
  }

  const sessionExp = JSON.parse(user.session).exp as number;
  const expDate = new Date(sessionExp);

  await createSessionCookie(user, expDate);

  return sessionExp;
};

const createClientSession = async (user: User) => {
  const session = createSession(user);
  user.session = serializeSession(await session);
  await saveUser(JSON.stringify(user));
};

const createSession = async (user: User): Promise<Session> => {
  const exp = createSessionExiprationDate();
  return {
    _id: uuidv4(),
    userId: user._id.toString(),
    exp: exp.getTime(),
  };
};

const createSessionCookie = async (user: User, expirationDate: Date) => {
  const session = deserializeSession(user.session!!);
  const encryptedSession = await encryptSession(session);
  await createUserCookie(encryptedSession, expirationDate);
};

export const removeSession = async (user: User) => {
  user.session = null;
  await saveUser(JSON.stringify(user));
};

export const validateClientSessionCookie = async (
  cookie: RequestCookie | string
): Promise<User | null> => {
  let cookieValue = "";
  if (typeof cookie !== "string") {
    cookieValue = cookie.value;
  } else {
    cookieValue = cookie;
  }

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
    await removeSession(user);
    await deleteUserCookie();
    return null;
  }

  /* At this point the only mismatching data can be the expiration date
   * If it is we update the client cookie to match the db session
   */

  if (clientSession.exp !== dbUserSession.exp) {
    const expDate = new Date(dbUserSession.exp);
    await createSessionCookie(user, expDate);
  }

  return user;
};

export const renewSession = async () => {
  const userCookie = await getUserCookie();

  if (!userCookie) return;

  const clientSession = await decryptSession(userCookie.value);
  const user = await getUser(clientSession.userId, "id").then((user) => {
    return JSON.parse(user) as User;
  });
  //Update session in db
  const oldSession = deserializeSession(user.session!!);
  const sessionExp = createSessionExiprationDate();
  oldSession.exp = sessionExp.getTime();
  user.session = serializeSession(oldSession);
  await saveUser(JSON.stringify(user));
  //Update client cookie
  await createSessionCookie(user, sessionExp);
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
