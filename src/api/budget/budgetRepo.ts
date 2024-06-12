"use server";

import { Budget } from "../../types";
import { getMongoConnection } from "../../db/mongoConnection";
import { budgetCollectionName as collectionName } from "../../db/collectionConstants";

export const createBudget = async (budget: Budget) => {
  const db = await getMongoConnection();
  const result = await db.collection(collectionName).insertOne(budget);
  return {
    acknowledged: result.acknowledged,
    insertedId: result.insertedId.toString(),
  };
};

export const readAllBudgets = async () => {
  const db = await getMongoConnection();
  return await db.collection(collectionName).find().toArray();
};

export const updateBudget = async (budget: Budget) => {
  const db = await getMongoConnection();
  const updateResult = await db
    .collection(collectionName)
    .updateOne({ _id: budget._id }, { $set: budget });
  return updateResult;
};

export const deleteBudget = async () => {
  const db = await getMongoConnection();
};
