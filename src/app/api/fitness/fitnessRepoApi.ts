// what am I going to ask the db for

import { fitnessCollectionName } from "@/db/collectionConstants";
import { getMongoConnection } from "@/db/mongoConnection";
import { Fitness } from "@/types/fitness";
import { ObjectId } from "mongodb";

export const createFitness = async (fitness: Fitness) => {
  const db = await getMongoConnection();
  const result = await db.collection(fitnessCollectionName).insertOne(fitness);
  return {
    acknowledged: result.acknowledged,
    insertedId: result.insertedId.toString(),
  };
};

export const readUserFitness = async (userId: string) => {
  const db = await getMongoConnection();
  const fitness = await db
    .collection(fitnessCollectionName)
    .findOne({ userId: userId });
  return fitness;
};

export const updateFitness = async (fitness: Fitness) => {
  const db = await getMongoConnection();
  const { _id, ...updatedFitness } = fitness;
  const updateResult = await db
    .collection(fitnessCollectionName)
    .updateOne({ _id: new ObjectId(fitness._id) }, { $set: updatedFitness });
  return updateResult;
};
