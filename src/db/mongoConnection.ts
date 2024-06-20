"use server";

import { Db, MongoClient } from "mongodb";
import { dbCollectionNames } from "./collectionConstants";

const connectionString = process.env.ATLAS_URI || "";
let client: MongoClient | null = null;
let dbConnection: Promise<Db> | null = null;

export async function getMongoConnection(): Promise<Db> {
  if (!dbConnection) {
    dbConnection = connectToDatabase();
    await initalizeCollections(await dbConnection);
  }
  return await dbConnection;
}

export const closeDbConnection = async (): Promise<void> => {
  if (client) await client.close();
};

const connectToDatabase = async (): Promise<Db> => {
  try {
    if (!client) {
      client = new MongoClient(connectionString);
    }
    const conn = await client.connect();
    const db = conn.db(process.env.DB_NAME);
    return db;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

const initalizeCollections = async (db: Db): Promise<void> => {
  const dbCollections = (await db.collections()).map(
    (collection) => collection.collectionName
  );

  for (const collection of dbCollectionNames) {
    if (dbCollections.indexOf(collection) === -1) {
      await db.createCollection(collection);
    }
  }
};
