"use server";

import { cookies } from "next/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { msTimestamps } from "./util";

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
