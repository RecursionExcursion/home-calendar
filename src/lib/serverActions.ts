"use server";

import { redirect } from "next/navigation";

export const serverRedirect = async (url: string) => {
  redirect(url);
};
