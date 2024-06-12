"use server";

import { ObjectId } from "mongodb";
import { getMongoConnection } from "../../db/mongoConnection";
import { Task } from "../../types";

const collectionName = "tasks";

export const saveTask = async (task: Task) => {
  const db = await getMongoConnection();
  const result = await db.collection(collectionName).insertOne(task);
  return {
    acknowledged: result.acknowledged,
    insertedId: result.insertedId.toString(),
  };
};

export const findTaskById = async (id: string) => {
  const db = await getMongoConnection();
  const objId = ObjectId.createFromHexString(id);
  const task = await db.collection(collectionName).findOne({ _id: objId });

  if (task) {
    return {
      ...task,
      _id: task._id.toString(),
    };
  }
  return null;
};

export const findAllTasks = async () => {
  const db = await getMongoConnection();
  return await db.collection(collectionName).find().toArray();
};

export const updateTask = async (task: Task) => {
  const db = await getMongoConnection();
  const updateResult = await db
    .collection(collectionName)
    .updateOne({ _id: task._id }, { $set: task });
  return updateResult;
};

export const deleteTaskById = async (id: string) => {
  const db = await getMongoConnection();
  const objId = ObjectId.createFromHexString(id);
  const deleteResult = await db
    .collection(collectionName)
    .deleteOne({ _id: objId });
  return deleteResult;
};
