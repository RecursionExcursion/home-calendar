"use server";

import { ObjectId } from "mongodb";
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

export const readUserBudget = async (userId: string) => {
  const db = await getMongoConnection();
  const budget = await db.collection(budgetCollectionName).findOne({ userId: userId });
  return budget;
};

export const updateBudget = async (budget: Budget) => {
  const db = await getMongoConnection();
  const { _id, ...updatedBudget } = budget;
  const updateResult = await db
    .collection(budgetCollectionName)
    .updateOne({ _id: new ObjectId(budget._id) }, { $set: updatedBudget });
  return updateResult;
};
