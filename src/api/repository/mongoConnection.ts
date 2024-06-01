"use server";

import { Db, MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";
let client: MongoClient | null = null;
let dbConnection: Promise<Db> | null = null;

export async function getMongoConnection(): Promise<Db> {
  if (!dbConnection) {
    dbConnection = connectToDatabase();
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
