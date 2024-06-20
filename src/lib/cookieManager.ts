"use server";

import { cookies } from "next/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { decryptData } from "./crypto";

export const getUserCookie = async (): Promise<RequestCookie | undefined> => {
  return cookies().get("user");
};

export const createUserCookie = async (sessionId: string, expirationDate: Date) => {
  cookies().set("user", sessionId, {
    httpOnly: true,
    expires: expirationDate,
    // sameSite: "lax",
  });
};

export const deleteUserCookie = async () => {
  cookies().delete("user");
};

export const getUserIdFromCookie = async (): Promise<string | undefined> => {
  const userCookie = await getUserCookie();

  if (!userCookie) return undefined;

  const decryptedUser = await decryptData(userCookie?.value!!);
  const sessionInfo = JSON.parse(decryptedUser);
  return sessionInfo.userId;
};
