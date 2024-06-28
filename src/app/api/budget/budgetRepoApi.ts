"use server";

import { budgetCollectionName } from "../../../db/collectionConstants";
import { getMongoConnection } from "../../../db/mongoConnection";
import { Budget } from "../../../types";

export const createBudget = async (budget: Budget) => {
  const db = await getMongoConnection();
  const result = await db.collection(budgetCollectionName).insertOne(budget);
  return {
    acknowledged: result.acknowledged,
    insertedId: result.insertedId.toString(),
  };
};

export const readAllBudgets = async () => {
  const db = await getMongoConnection();
  return await db.collection(budgetCollectionName).find().toArray();
};

export const updateBudget = async (budget: Budget) => {
  const db = await getMongoConnection();
  const updateResult = await db
    .collection(budgetCollectionName)
    .updateOne({ _id: budget._id }, { $set: budget });
  return updateResult;
};

export const deleteBudget = async () => {
  const db = await getMongoConnection();
};
