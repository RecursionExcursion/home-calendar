"use server";

import { cookies } from "next/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { decryptData } from "./crypto";

const cookieKeys = {
  user: "user",
  surf: "surf",
};

/* User */
export const getUserCookie = async (): Promise<RequestCookie | undefined> => {
  return cookies().get(cookieKeys.user);
};

export const createUserCookie = async (data: string, expirationDate: Date) => {
  cookies().set(cookieKeys.user, data, {
    httpOnly: true,
    expires: expirationDate,
    sameSite: "lax",
  });
};

export const deleteUserCookie = async () => {
  cookies().delete(cookieKeys.user);
};

export const getUserIdFromCookie = async (): Promise<string | undefined> => {
  const userCookie = await getUserCookie();

  if (!userCookie) return undefined;

  const decryptedUser = await decryptData(userCookie?.value!!);
  const sessionInfo = JSON.parse(decryptedUser);
  return sessionInfo.userId;
};

/* SurfData */
export const getSurfCookie = async (): Promise<RequestCookie | undefined> => {
  return cookies().get(cookieKeys.surf);
};

export const createSurfCookie = async (data: string, expirationDate: Date) => {
  cookies().set(cookieKeys.surf, data, {
    httpOnly: true,
    expires: expirationDate,
    sameSite: "lax",
  });
};

export const deleteSurfCookie = async () => {
  cookies().delete(cookieKeys.surf);
};
