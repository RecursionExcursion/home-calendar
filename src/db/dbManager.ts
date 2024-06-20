"use server";

import { getMongoConnection } from "./mongoConnection";

export const dropCollection = async (collectionName: string) => {
  const db = await getMongoConnection();
  let res = await db.dropCollection(collectionName);
  if (res) {
    await db.createCollection(collectionName);
  }
  return res;
};
