"use server";

import { cookies } from "next/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { msTimestamps } from "./util";
import { decryptData } from "./crypto";

export const getUserCookie = async (): Promise<RequestCookie | undefined> => {
  return cookies().get("user");
};

export const createUserCookie = async (sessionId: string) => {
  cookies().set("user", sessionId, {
    httpOnly: true,
    maxAge: msTimestamps.oneWeek,
  });
};

export const deleteUserCookie = async () => {
  cookies().delete("user");
};

export const getUserIdFromCookie = async (): Promise<string | undefined> => {
  const userCookie = await getUserCookie();
  const decryptedUser = await decryptData(userCookie?.value!!);
  const sessionInfo = JSON.parse(decryptedUser);
  return sessionInfo.userId;
};
