"use server";

import { revalidateApp } from "../app/api/apiRoutes";
import { getMongoConnection } from "./mongoConnection";

export const dropCollection = async (collectionName: string) => {
  const db = await getMongoConnection();
  let res = await db.dropCollection(collectionName);
  if (res) {
    await db.createCollection(collectionName);
  }
  revalidateApp();
  return res;
};
